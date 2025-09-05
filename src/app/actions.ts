'use server';

import {
  generatePracticeTasks as generatePracticeTasksFlow,
  type GeneratePracticeTasksInput,
} from '@/ai/flows/generate-practice-tasks';

interface ActionResult {
  success: boolean;
  tasks?: string[];
  error?: string;
}

export async function generatePracticeTasks(
  input: GeneratePracticeTasksInput
): Promise<ActionResult> {
  try {
    const result = await generatePracticeTasksFlow(input);
    return { success: true, tasks: result.practiceTasks };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: `Failed to generate tasks: ${errorMessage}` };
  }
}
