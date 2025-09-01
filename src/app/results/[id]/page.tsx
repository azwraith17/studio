
"use client";

import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { summarizeTestResults } from '@/ai/flows/summarize-test-results';
import { professionalAnalysis, ProfessionalAnalysisOutput } from '@/ai/flows/professional-analysis';
import { depressionQuestions, anxietyQuestions } from '@/lib/questions';
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
import { format, parseISO } from 'date-fns';

type AnalysisData = {
    summary: string;
    professionalReport: ProfessionalAnalysisOutput;
    testData: TestResult;
}

export default function ResultsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [depressionAnalysis, setDepressionAnalysis] = useState<AnalysisData | null>(null);
  const [anxietyAnalysis, setAnxietyAnalysis] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const testId = params.id as string;
  const isFromHistory = searchParams.get('history') === 'true';

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
            const analysisData: AnalysisData = {
              summary: historicTest.summary,
              professionalReport: historicTest.professionalAnalysis!,
              testData: historicTest,
            };
            if (historicTest.type === 'Depression') {
              setDepressionAnalysis(analysisData);
            } else {
              setAnxietyAnalysis(analysisData);
            }
          } else {
             toast({ title: "Error", description: "Test result not found.", variant: "destructive" });
          }
        } else {
          // This is a new test result, generate analysis for all available data
          const generateAnalysis = async (score: number, maxScore: number, answers: Record<string, number>, testName: 'Depression' | 'Anxiety') => {
            const questions = testName === 'Depression' ? depressionQuestions : anxietyQuestions;
            const simpleSummaryRes = await summarizeTestResults({
              testName: `${testName} Test`,
              results: `The user scored ${score} out of ${maxScore}.`,
            });

            const questionsMap = questions.reduce((acc, q) => {
              acc[q.id] = q.text;
              return acc;
            }, {} as Record<string, string>);

            const proAnalysis = await professionalAnalysis({
              testName: `${testName} (${testName === 'Depression' ? 'BDI' : 'GAD-7'}-based)`,
              answers: answers,
              questions: questionsMap,
              score: score,
              maxScore: maxScore,
            });
            
            return {
                summary: simpleSummaryRes.summary,
                professionalReport: proAnalysis,
                testData: {
                    id: testId,
                    type: testName,
                    date: new Date().toISOString(),
                    score: score,
                    maxScore: maxScore,
                    rawResults: answers,
                    summary: simpleSummaryRes.summary,
                    professionalAnalysis: proAnalysis,
                }
            };
          };

          if (newTestInfo.depressionScore !== null) {
            const analysis = await generateAnalysis(newTestInfo.depressionScore, 63, newTestInfo.depressionAnswers, 'Depression');
            setDepressionAnalysis(analysis);
          }

          if (newTestInfo.anxietyScore !== null) {
            const analysis = await generateAnalysis(newTestInfo.anxietyScore, 21, newTestInfo.anxietyAnswers, 'Anxiety');
            setAnxietyAnalysis(analysis);
          }
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
    toast({
        title: "Exporting...",
        description: "Your results are being prepared for download.",
    });

    let exportContent = `MindMetrics Test Report\n=========================\n\n`;

    const formatAnalysis = (analysis: AnalysisData | null) => {
        if (!analysis) return '';
        const { testData, summary, professionalReport } = analysis;
        let content = `Test Type: ${testData.type}\n`;
        content += `Date: ${format(parseISO(testData.date), "MMMM d, yyyy")}\n`;
        content += `Score: ${testData.score} / ${testData.maxScore}\n\n`;
        content += `AI Summary:\n${summary}\n\n`;
        if (professionalReport) {
            content += `--- Professional Analysis ---\n`;
            content += `Overview: ${professionalReport.overview}\n\n`;
            content += `Symptom Analysis: ${professionalReport.symptomAnalysis}\n\n`;
            content += `Potential Indicators: ${professionalReport.potentialIndicators}\n\n`;
            content += `Recommendations: ${professionalReport.recommendations}\n`;
        }
        return content;
    }
    
    if (depressionAnalysis) {
        exportContent += formatAnalysis(depressionAnalysis);
        exportContent += `\n-------------------------\n\n`;
    }
    if (anxietyAnalysis) {
        exportContent += formatAnalysis(anxietyAnalysis);
    }
    
    const blob = new Blob([exportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MindMetrics_Test_Report_${testId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const { name, email } = newTestInfo;
  const accountCreationUrl = `/finish-signup?name=${encodeURIComponent(name || '')}&email=${encodeURIComponent(email || '')}`;
  
  const renderAnalysisCard = (analysis: AnalysisData | null, testType: 'Depression' | 'Anxiety') => {
    if (!analysis && !isLoading) return null;
    
    const { testData, summary, professionalReport } = analysis || {};
    const score = testData?.score ?? null;
    const maxScore = testData?.maxScore ?? null;

    if (isLoading) {
      return (
         <Card>
            <CardHeader><CardTitle>Generating {testType} Analysis...</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-8 w-full mt-4" />
            </CardContent>
          </Card>
      );
    }

    if (!analysis) return null;

    return (
      <Card>
        <CardHeader>
            <CardTitle>{testType} Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span>{testType} Score</span>
                  <span>{score} / {maxScore}</span>
                </div>
                {score !== null && maxScore !== null && <Progress value={(score / maxScore) * 100} />}
            </div>
            
            {summary && (
              <Alert>
                <Bot className="h-4 w-4" />
                <AlertTitle>{testType} Test Summary</AlertTitle>
                <AlertDescription>{summary}</AlertDescription>
              </Alert>
            )}

            {professionalReport && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base">
                    <div className="flex items-center gap-2"><Stethoscope/> Professional Analysis</div>
                  </AccordionTrigger>
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
            )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 py-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Your Assessment Results</h1>
          <p className="text-muted-foreground mt-2">Here is a breakdown of your recent assessment.</p>
        </div>

        {renderAnalysisCard(depressionAnalysis, 'Depression')}
        {renderAnalysisCard(anxietyAnalysis, 'Anxiety')}

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
            <Button className="w-full sm:w-auto" onClick={handleExport} disabled={isLoading || (!depressionAnalysis && !anxietyAnalysis)}>
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
