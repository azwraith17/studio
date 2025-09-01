'use server';
/**
 * @fileOverview Determines if the anxiety test should be triggered based on depression test results.
 *
 * - anxietyTestTrigger - A function that determines whether to trigger the anxiety test.
 * - AnxietyTestTriggerInput - The input type for the anxietyTestTrigger function, which includes the depression test score.
 * - AnxietyTestTriggerOutput - The return type for the anxietyTestTrigger function, indicating whether the anxiety test should be triggered.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnxietyTestTriggerInputSchema = z.object({
  depressionTestScore: z
    .number()
    .describe('The score from the depression test.'),
});
export type AnxietyTestTriggerInput = z.infer<typeof AnxietyTestTriggerInputSchema>;

const AnxietyTestTriggerOutputSchema = z.object({
  triggerAnxietyTest: z
    .boolean()
    .describe(
      'Whether the anxiety test should be triggered based on the depression test score.'
    ),
});
export type AnxietyTestTriggerOutput = z.infer<typeof AnxietyTestTriggerOutputSchema>;

export async function anxietyTestTrigger(
  input: AnxietyTestTriggerInput
): Promise<AnxietyTestTriggerOutput> {
  return anxietyTestTriggerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'anxietyTestTriggerPrompt',
  input: {schema: AnxietyTestTriggerInputSchema},
  output: {schema: AnxietyTestTriggerOutputSchema},
  prompt: `Based on the depression test score of {{{depressionTestScore}}}, determine if the anxiety test should be triggered. A score above 15 indicates a significant level of depression symptoms and warrants further anxiety assessment. Return true to trigger the anxiety test, and false otherwise.`,
});

const anxietyTestTriggerFlow = ai.defineFlow(
  {
    name: 'anxietyTestTriggerFlow',
    inputSchema: AnxietyTestTriggerInputSchema,
    outputSchema: AnxietyTestTriggerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
