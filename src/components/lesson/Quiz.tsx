"use client";

import { useState, useCallback } from 'react';
import type { QuizQuestion } from '@/lib/content';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CheckCircle2, FileQuestion, XCircle } from 'lucide-react';

interface QuizProps {
  lessonId: string;
  questions: QuizQuestion[];
}

type QuizScores = { [lessonId: string]: number };

export default function Quiz({ lessonId, questions }: QuizProps) {
  const [quizScores, setQuizScores] = useLocalStorage<QuizScores>('quizScores', {});
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(quizScores[lessonId] ?? null);

  const handleSelectAnswer = useCallback((questionIndex: number, answerIndex: number) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  }, [isSubmitted, selectedAnswers]);

  const handleSubmit = () => {
    let currentScore = 0;
    questions.forEach((q, i) => {
      if (q.correctAnswer === selectedAnswers[i]) {
        currentScore++;
      }
    });
    const finalScore = (currentScore / questions.length) * 100;
    setScore(finalScore);
    setQuizScores({ ...quizScores, [lessonId]: finalScore });
    setIsSubmitted(true);
  };
  
  const handleRetake = () => {
    setIsSubmitted(false);
    setSelectedAnswers(Array(questions.length).fill(-1));
    setScore(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileQuestion className="h-6 w-6 text-primary" />
          <span>Quick Quiz</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {questions.map((q, qIndex) => (
          <div key={qIndex}>
            <p className="font-medium mb-4">{qIndex + 1}. {q.question}</p>
            <RadioGroup
              value={selectedAnswers[qIndex].toString()}
              onValueChange={(value) => handleSelectAnswer(qIndex, parseInt(value))}
              disabled={isSubmitted}
            >
              {q.options.map((option, oIndex) => {
                const isCorrect = oIndex === q.correctAnswer;
                const isSelected = oIndex === selectedAnswers[qIndex];
                
                return (
                  <div
                    key={oIndex}
                    className={cn(
                      "flex items-center space-x-2 p-3 rounded-md border transition-colors",
                      isSubmitted && isCorrect && "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700",
                      isSubmitted && !isCorrect && isSelected && "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700"
                    )}
                  >
                    <RadioGroupItem value={oIndex.toString()} id={`${lessonId}-${qIndex}-${oIndex}`} />
                    <Label htmlFor={`${lessonId}-${qIndex}-${oIndex}`} className="flex-1 cursor-pointer">{option}</Label>
                    {isSubmitted && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {isSubmitted && !isCorrect && isSelected && <XCircle className="h-5 w-5 text-red-500" />}
                  </div>
                )
              })}
            </RadioGroup>
            {isSubmitted && (
                <div className="mt-3 p-3 text-sm bg-secondary rounded-md">
                    <p><span className="font-semibold">Explanation:</span> {q.explanation}</p>
                </div>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        {isSubmitted ? (
            <div className="flex items-center justify-between w-full">
                <p className="text-lg font-bold">Your Score: {score?.toFixed(0)}%</p>
                <Button onClick={handleRetake} variant="outline">Retake Quiz</Button>
            </div>
        ) : (
            <Button onClick={handleSubmit} disabled={selectedAnswers.includes(-1)}>
                Submit Answers
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
