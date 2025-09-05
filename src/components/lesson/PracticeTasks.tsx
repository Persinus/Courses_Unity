"use client";

import { useState } from 'react';
import { generatePracticeTasks as generatePracticeTasksAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PracticeTasksProps {
  lessonId: string;
  lessonTitle: string;
  lessonContent: string;
  initialTasks: string[];
}

export default function PracticeTasks({ lessonId, lessonTitle, lessonContent, initialTasks }: PracticeTasksProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateTasks = async () => {
    setIsLoading(true);
    try {
      const result = await generatePracticeTasksAction({
        lessonTitle,
        lessonContent,
        desiredNumberOfTasks: 2,
      });

      if (result.success && result.tasks) {
        setTasks(prevTasks => [...prevTasks, ...result.tasks]);
        toast({
          title: "Tasks Generated!",
          description: "New practice tasks have been added.",
        });
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Failed to generate tasks:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate new tasks. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="h-6 w-6 text-primary" />
          <span>Practice Tasks</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 list-disc pl-5 mb-6">
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
        <Button onClick={handleGenerateTasks} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Generate More Tasks
        </Button>
      </CardContent>
    </Card>
  );
}
