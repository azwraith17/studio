"use client";

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { summarizeTestResults } from '@/ai/flows/summarize-test-results';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Bot, Home, FileDown } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Summary = {
    title: string;
    summary: string;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const depressionScore = useMemo(() => searchParams.get('depressionScore') ? Number(searchParams.get('depressionScore')) : null, [searchParams]);
  const anxietyScore = useMemo(() => searchParams.get('anxietyScore') ? Number(searchParams.get('anxietyScore')) : null, [searchParams]);
  const name = useMemo(() => searchParams.get('name'), [searchParams]);
  const email = useMemo(() => searchParams.get('email'), [searchParams]);
  
  // These are simplified max scores for the demo tests
  const maxDepressionScore = 21; 
  const maxAnxietyScore = 21;

  useEffect(() => {
    const fetchSummaries = async () => {
      setIsLoading(true);
      const newSummaries: Summary[] = [];
      
      try {
        if (depressionScore !== null) {
          const depressionResult = await summarizeTestResults({
            testName: 'Depression (BDI-based)',
            results: `The user scored ${depressionScore} out of ${maxDepressionScore}.`,
          });
          newSummaries.push({ title: 'Depression Test Summary', summary: depressionResult.summary });
        }
        if (anxietyScore !== null) {
          const anxietyResult = await summarizeTestResults({
            testName: 'Anxiety (GAD-7-based)',
            results: `The user scored ${anxietyScore} out of ${maxAnxietyScore}.`,
          });
          newSummaries.push({ title: 'Anxiety Test Summary', summary: anxietyResult.summary });
        }
        setSummaries(newSummaries);
      } catch (error) {
        console.error("Error fetching summaries:", error);
        // Set a default error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummaries();
  }, [depressionScore, anxietyScore]);

  const accountCreationUrl = `/finish-signup?name=${encodeURIComponent(name || '')}&email=${encodeURIComponent(email || '')}`;

  return (
    <div className="container mx-auto max-w-4xl p-4 py-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Your Assessment Results</h1>
          <p className="text-muted-foreground mt-2">Here is a breakdown of your recent assessment.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Scores</CardTitle>
            <CardDescription>This section shows your scores for the completed tests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {depressionScore !== null && (
              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span>Depression Score</span>
                  <span>{depressionScore} / {maxDepressionScore}</span>
                </div>
                <Progress value={(depressionScore / maxDepressionScore) * 100} />
              </div>
            )}
            {anxietyScore !== null && (
              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span>Anxiety Score</span>
                  <span>{anxietyScore} / {maxAnxietyScore}</span>
                </div>
                <Progress value={(anxietyScore / maxAnxietyScore) * 100} />
              </div>
            )}
             {depressionScore === null && anxietyScore === null && (
                 <p className="text-muted-foreground">No score data available.</p>
             )}
          </CardContent>
        </Card>

        {isLoading ? (
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ) : (
          summaries.map((s, index) => (
            <Alert key={index}>
              <Bot className="h-4 w-4" />
              <AlertTitle>{s.title}</AlertTitle>
              <AlertDescription>
                {s.summary}
              </AlertDescription>
            </Alert>
          ))
        )}

        {name && email && (
          <Card>
            <CardHeader>
              <CardTitle>Save Your Progress</CardTitle>
              <CardDescription>Create an account to track your results over time and gain deeper insights.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your results for <span className="font-semibold text-foreground">{name}</span> ({email}) will be saved upon account creation.
              </p>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row gap-2">
              <Button asChild className="w-full sm:w-auto">
                <Link href={accountCreationUrl}>Create Account</Link>
              </Button>
               <Button variant="outline" className="w-full sm:w-auto">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export Results
                </Button>
            </CardFooter>
          </Card>
        )}
        
        <Alert variant="destructive">
            <AlertTitle>Important Disclaimer</AlertTitle>
            <AlertDescription>
            This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </AlertDescription>
        </Alert>

        <div className="text-center">
          <Button asChild>
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
