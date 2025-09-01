
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
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
import { useToast } from '@/hooks/use-toast';
import { mockTestHistory, TestResult } from '@/lib/data';

type Summary = {
    title: string;
    summary: string;
}

type ProfessionalReport = {
    testName: string;
    report: ProfessionalAnalysisOutput;
}

export default function ResultsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [summary, setSummary] = useState<string | null>(null);
  const [professionalReport, setProfessionalReport] = useState<ProfessionalAnalysisOutput | null>(null);
  const [testData, setTestData] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const testId = params.id as string;
  const isFromHistory = searchParams.get('history') === 'true';

  // Memoize values from URL search params for new tests
  const newTestInfo = useMemo(() => ({
    name: searchParams.get('name'),
    email: searchParams.get('email'),
    depressionScore: searchParams.get('depressionScore') ? Number(searchParams.get('depressionScore')) : null,
    anxietyScore: searchParams.get('anxietyScore') ? Number(searchParams.get('anxietyScore')) : null,
    depressionAnswers: searchParams.get('depressionAnswers') ? JSON.parse(searchParams.get('depressionAnswers')!) : null,
    anxietyAnswers: searchParams.get('anxietyAnswers') ? JSON.parse(searchParams.get('anxietyAnswers')!) : null,
  }), [searchParams]);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        if (isFromHistory) {
          const historicTest = mockTestHistory.find(t => t.id === testId);
          if (historicTest) {
            setTestData(historicTest);
            setSummary(historicTest.summary);
            if (historicTest.professionalAnalysis) {
              setProfessionalReport(historicTest.professionalAnalysis);
            }
          } else {
             toast({ title: "Error", description: "Test result not found.", variant: "destructive" });
          }
        } else {
          // This is a new test result, generate analysis
          let score, maxScore, answers, testName, questions;
          
          if (newTestInfo.depressionScore !== null) {
            score = newTestInfo.depressionScore;
            maxScore = 63;
            answers = newTestInfo.depressionAnswers;
            testName = 'Depression (BDI-based)';
            questions = depressionQuestions;
          } else if (newTestInfo.anxietyScore !== null) {
            score = newTestInfo.anxietyScore;
            maxScore = 21;
            answers = newTestInfo.anxietyAnswers;
            testName = 'Anxiety (GAD-7-based)';
            questions = anxietyQuestions;
          } else {
            setIsLoading(false);
            return;
          }

          setTestData({
            id: testId,
            type: testName.includes('Depression') ? 'Depression' : 'Anxiety',
            date: new Date().toISOString(),
            score: score,
            maxScore: maxScore,
            rawResults: answers,
            summary: '', // will be generated
          });

          const simpleSummaryRes = await summarizeTestResults({
            testName: testName,
            results: `The user scored ${score} out of ${maxScore}.`,
          });
          setSummary(simpleSummaryRes.summary);

          const questionsMap = questions.reduce((acc, q) => {
            acc[q.id] = q.text;
            return acc;
          }, {} as Record<string, string>);

          const proAnalysis = await professionalAnalysis({
            testName: testName,
            answers: answers,
            questions: questionsMap,
            score: score,
            maxScore: maxScore,
          });
          setProfessionalReport(proAnalysis);

          // Here you would typically save the full result to a database.
          // For now, we update our "mock" state to include the generated analysis
          // so it can be exported immediately.
          setTestData(prev => prev ? {
             ...prev,
             summary: simpleSummaryRes.summary,
             professionalAnalysis: proAnalysis
            } : null);

        }
      } catch (error) {
        console.error("Error fetching results:", error);
        toast({
            title: "Error Generating Analysis",
            description: "There was a problem generating the AI-powered analysis for your results.",
            variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [testId, isFromHistory, newTestInfo, toast]);

  const handleExport = () => {
    if (!testData) {
        toast({ title: "Error", description: "No data to export.", variant: "destructive" });
        return;
    }
    toast({
        title: "Exporting...",
        description: "Your results are being prepared for download.",
    });

    let exportContent = `Test Report: ${testData.id}\n`;
    exportContent += `Test Type: ${testData.type}\n`;
    exportContent += `Date: ${format(parseISO(testData.date), "MMMM d, yyyy")}\n`;
    exportContent += `Score: ${testData.score} / ${testData.maxScore}\n\n`;
    
    const finalSummary = summary || testData.summary;
    exportContent += `AI Summary:\n${finalSummary}\n\n`;

    const finalReport = professionalReport || testData.professionalAnalysis;
    if (finalReport) {
      exportContent += `--- Professional Analysis ---\n`;
      exportContent += `Overview: ${finalReport.overview}\n\n`;
      exportContent += `Symptom Analysis: ${finalReport.symptomAnalysis}\n\n`;
      exportContent += `Potential Indicators: ${finalReport.potentialIndicators}\n\n`;
      exportContent += `Recommendations: ${finalReport.recommendations}\n`;
    }

    const blob = new Blob([exportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MindMetrics_Test_Report_${testData.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const { name, email } = newTestInfo;
  const accountCreationUrl = `/finish-signup?name=${encodeURIComponent(name || '')}&email=${encodeURIComponent(email || '')}`;
  const score = testData?.score ?? null;
  const maxScore = testData?.maxScore ?? null;
  const testType = testData?.type ?? '';

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
            {score !== null && maxScore !== null ? (
              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span>{testType} Score</span>
                  <span>{score} / {maxScore}</span>
                </div>
                <Progress value={(score / maxScore) * 100} />
              </div>
            ) : isLoading ? (
               <div className="space-y-4">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-4 w-full" />
              </div>
            ) : (
               <p className="text-muted-foreground">No score data available for this result.</p>
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
            {summary && (
              <Alert>
                <Bot className="h-4 w-4" />
                <AlertTitle>{testType} Test Summary</AlertTitle>
                <AlertDescription>{summary}</AlertDescription>
              </Alert>
            )}

            {professionalReport && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Stethoscope/> Professional Analysis</CardTitle>
                  <CardDescription>A detailed clinical breakdown of the results for healthcare providers.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    <AccordionItem value="item-0">
                      <AccordionTrigger>{testType}</AccordionTrigger>
                      <AccordionContent className="space-y-4 p-1">
                        <div>
                          <h4 className="font-semibold">Overview</h4>
                          <p className="text-muted-foreground text-sm">{professionalReport.overview}</p>
                        </div>
                         <div>
                          <h4 className="font-semibold">Symptom Analysis</h4>
                          <p className="text-muted-foreground text-sm">{professionalReport.symptomAnalysis}</p>
                        </div>
                         <div>
                          <h4 className="font-semibold">Potential Indicators</h4>
                          <p className="text-muted-foreground text-sm">{professionalReport.potentialIndicators}</p>
                        </div>
                         <div>
                          <h4 className="font-semibold">Recommendations</h4>
                          <p className="text-muted-foreground text-sm">{professionalReport.recommendations}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {!isFromHistory && name && email && (
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
            </CardFooter>
          </Card>
        )}
        
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-2">
            <Button className="w-full sm:w-auto" onClick={handleExport}>
              <FileDown className="mr-2 h-4 w-4" />
              Export Results
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Return to Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Alert variant="destructive">
            <AlertTitle>Important Disclaimer</AlertTitle>
            <AlertDescription>
            This tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </AlertDescription>
        </Alert>

      </div>
    </div>
  );
}
