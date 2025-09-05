'use server';

/**
 * @fileOverview AI-powered practice task generator for lessons.
 *
 * - generatePracticeTasks - A function that generates practice tasks for a given lesson.
 * - GeneratePracticeTasksInput - The input type for the generatePracticeTasks function.
 * - GeneratePracticeTasksOutput - The return type for the generatePracticeTasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePracticeTasksInputSchema = z.object({
  lessonTitle: z.string().describe('The title of the lesson.'),
  lessonContent: z.string().describe('The content of the lesson.'),
  desiredNumberOfTasks: z.number().describe('The desired number of practice tasks to generate.'),
});
export type GeneratePracticeTasksInput = z.infer<typeof GeneratePracticeTasksInputSchema>;

const GeneratePracticeTasksOutputSchema = z.object({
  practiceTasks: z.array(
    z.string().describe('A practice task for the lesson.')
  ).describe('A list of practice tasks for the lesson.'),
});
export type GeneratePracticeTasksOutput = z.infer<typeof GeneratePracticeTasksOutputSchema>;

export async function generatePracticeTasks(input: GeneratePracticeTasksInput): Promise<GeneratePracticeTasksOutput> {
  return generatePracticeTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePracticeTasksPrompt',
  input: {schema: GeneratePracticeTasksInputSchema},
  output: {schema: GeneratePracticeTasksOutputSchema},
  prompt: `You are an experienced educator creating practice tasks for lessons.

  Based on the lesson title and content, generate {{desiredNumberOfTasks}} relevant and engaging practice tasks for the student.
  The practice tasks should give the student hands-on experience with the concepts taught in the lesson.

  Lesson Title: {{{lessonTitle}}}
  Lesson Content: {{{lessonContent}}}

  Practice Tasks:
  {{#each practiceTasks}}- {{this}}\n{{/each}}`,
});

const generatePracticeTasksFlow = ai.defineFlow(
  {
    name: 'generatePracticeTasksFlow',
    inputSchema: GeneratePracticeTasksInputSchema,
    outputSchema: GeneratePracticeTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
