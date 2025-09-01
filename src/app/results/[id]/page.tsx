"use client";

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { summarizeTestResults } from '@/ai/flows/summarize-test-results';
import { professionalAnalysis, ProfessionalAnalysisOutput } from '@/ai/flows/professional-analysis';
import { depressionQuestions, anxietyQuestions, Question } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Bot, Home, FileDown, Stethoscope } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Summary = {
    title: string;
    summary: string;
}

type ProfessionalReport = {
    testName: string;
    report: ProfessionalAnalysisOutput;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [professionalReports, setProfessionalReports] = useState<ProfessionalReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const name = useMemo(() => searchParams.get('name'), [searchParams]);
  const email = useMemo(() => searchParams.get('email'), [searchParams]);
  
  // Scores
  const depressionScore = useMemo(() => searchParams.get('depressionScore') ? Number(searchParams.get('depressionScore')) : null, [searchParams]);
  const anxietyScore = useMemo(() => searchParams.get('anxietyScore') ? Number(searchParams.get('anxietyScore')) : null, [searchParams]);
  
  // Answers
  const depressionAnswers = useMemo(() => searchParams.get('depressionAnswers') ? JSON.parse(searchParams.get('depressionAnswers')!) : null, [searchParams]);
  const anxietyAnswers = useMemo(() => searchParams.get('anxietyAnswers') ? JSON.parse(searchParams.get('anxietyAnswers')!) : null, [searchParams]);
  
  // Max scores
  const maxDepressionScore = 63; 
  const maxAnxietyScore = 21;

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      const newSummaries: Summary[] = [];
      const newReports: ProfessionalReport[] = [];
      
      try {
        if (depressionScore !== null && depressionAnswers !== null) {
          const simpleSummary = await summarizeTestResults({
            testName: 'Depression (BDI-based)',
            results: `The user scored ${depressionScore} out of ${maxDepressionScore}.`,
          });
          newSummaries.push({ title: 'Depression Test Summary', summary: simpleSummary.summary });

          const depressionQuestionsMap = depressionQuestions.reduce((acc, q) => {
            acc[q.id] = q.text;
            return acc;
          }, {} as Record<string, string>);

          const proAnalysis = await professionalAnalysis({
            testName: 'Depression (BDI-based)',
            answers: depressionAnswers,
            questions: depressionQuestionsMap,
            score: depressionScore,
            maxScore: maxDepressionScore,
          });
          newReports.push({ testName: 'Depression (BDI-based)', report: proAnalysis });
        }

        if (anxietyScore !== null && anxietyAnswers !== null) {
          const simpleSummary = await summarizeTestResults({
            testName: 'Anxiety (GAD-7-based)',
            results: `The user scored ${anxietyScore} out of ${maxAnxietyScore}.`,
          });
          newSummaries.push({ title: 'Anxiety Test Summary', summary: simpleSummary.summary });
          
          const anxietyQuestionsMap = anxietyQuestions.reduce((acc, q) => {
            acc[q.id] = q.text;
            return acc;
          }, {} as Record<string, string>);

          const proAnalysis = await professionalAnalysis({
            testName: 'Anxiety (GAD-7-based)',
            answers: anxietyAnswers,
            questions: anxietyQuestionsMap,
            score: anxietyScore,
            maxScore: maxAnxietyScore,
          });
          newReports.push({ testName: 'Anxiety (GAD-7-based)', report: proAnalysis });
        }
        
        setSummaries(newSummaries);
        setProfessionalReports(newReports);

      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [depressionScore, anxietyScore, depressionAnswers, anxietyAnswers]);

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
            <CardHeader><CardTitle>Generating Analysis...</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-8 w-full mt-4" />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {summaries.map((s, index) => (
              <Alert key={index}>
                <Bot className="h-4 w-4" />
                <AlertTitle>{s.title}</AlertTitle>
                <AlertDescription>{s.summary}</AlertDescription>
              </Alert>
            ))}

            {professionalReports.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Stethoscope/> Professional Analysis</CardTitle>
                  <CardDescription>A detailed clinical breakdown of the results for healthcare providers.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {professionalReports.map((r, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>{r.testName}</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold">Overview</h4>
                            <p className="text-muted-foreground">{r.report.overview}</p>
                          </div>
                           <div>
                            <h4 className="font-semibold">Symptom Analysis</h4>
                            <p className="text-muted-foreground">{r.report.symptomAnalysis}</p>
                          </div>
                           <div>
                            <h4 className="font-semibold">Potential Indicators</h4>
                            <p className="text-muted-foreground">{r.report.potentialIndicators}</p>
                          </div>
                           <div>
                            <h4 className="font-semibold">Recommendations</h4>
                            <p className="text-muted-foreground">{r.report.recommendations}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>
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
