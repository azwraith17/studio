"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { anxietyTestTrigger } from '@/ai/flows/anxiety-test-trigger';
import { depressionQuestions, Question } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function DepressionTestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentAnswer, setCurrentAnswer] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalQuestions = depressionQuestions.length;
  const currentQuestion: Question = depressionQuestions[currentQuestionIndex];

  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';

  const handleAnswerChange = (score: number) => {
    setCurrentAnswer(score);
  };

  const handleNext = () => {
    if (currentAnswer === undefined) {
      toast({
        title: "Please select an answer",
        description: "You must select an option before proceeding.",
        variant: "destructive",
      });
      return;
    }
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: currentAnswer }));
    setCurrentAnswer(undefined);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    if (currentAnswer === undefined) {
        toast({
          title: "Please select an answer",
          description: "You must select an option before proceeding.",
          variant: "destructive",
        });
        return;
    }
    
    const finalAnswers = { ...answers, [currentQuestion.id]: currentAnswer };
    setIsSubmitting(true);
    const totalScore = Object.values(finalAnswers).reduce((sum, score) => sum + score, 0);

    try {
      const result = await anxietyTestTrigger({ depressionTestScore: totalScore });
      const newTestId = `test-${Date.now()}`; // Mock test ID
      const queryParams = new URLSearchParams({
        name,
        email,
        depressionScore: totalScore.toString(),
      });

      if (result.triggerAnxietyTest) {
        toast({
          title: "Depression test complete",
          description: "Based on your results, we recommend a brief anxiety assessment.",
        });
        // Pass depression test data to anxiety test page via query params or state management
        router.push(`/test/anxiety?fromTest=${newTestId}&score=${totalScore}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
      } else {
        toast({
          title: "Test complete!",
          description: "Redirecting to your results.",
        });
        router.push(`/results/${newTestId}?${queryParams.toString()}`);
      }
    } catch (error) {
      console.error("Error triggering anxiety test:", error);
      toast({
        title: "An error occurred",
        description: "Could not process your test results. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.14))] p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <CardTitle>Depression Assessment (BDI)</CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label className="text-lg font-semibold">{currentQuestion.text}</Label>
            <RadioGroup
              value={currentAnswer?.toString()}
              onValueChange={(value) => handleAnswerChange(parseInt(value))}
              className="space-y-2"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 rounded-md border p-4 has-[:checked]:border-primary">
                  <RadioGroupItem value={option.score.toString()} id={`${currentQuestion.id}-${index}`} />
                  <Label htmlFor={`${currentQuestion.id}-${index}`} className="font-normal w-full">{option.text}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          {currentQuestionIndex < totalQuestions - 1 ? (
            <Button onClick={handleNext} disabled={isSubmitting}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Finish & View Results
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
