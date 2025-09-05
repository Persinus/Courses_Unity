"use client";

import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';

interface LessonCompletionProps {
  lessonId: string;
}

export default function LessonCompletion({ lessonId }: LessonCompletionProps) {
  const [completedLessons, setCompletedLessons] = useLocalStorage<string[]>('completedLessons', []);
  const [isCompleted, setIsCompleted] = useState(completedLessons.includes(lessonId));
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsCompleted(completedLessons.includes(lessonId));
  }, [completedLessons, lessonId]);

  const handleToggleComplete = () => {
    if (isCompleted) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
      setIsCompleted(false);
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
      setIsCompleted(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  return (
    <div className="flex justify-center my-12">
      <Button
        onClick={handleToggleComplete}
        size="lg"
        variant={isCompleted ? 'secondary' : 'default'}
        className="relative overflow-hidden transition-all duration-300"
      >
        <CheckCircle2
          className={cn(
            'mr-2 h-5 w-5 transition-transform duration-500',
            !isCompleted && 'scale-0'
          )}
        />
        <span
          className={cn(
            'transition-transform duration-300 ease-in-out',
            isAnimating ? 'animate-pulse' : ''
          )}
        >
          {isCompleted ? 'Lesson Completed!' : 'Mark as Complete'}
        </span>
      </Button>
    </div>
  );
}
