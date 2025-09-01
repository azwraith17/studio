'use server';

/**
 * @fileOverview Summarizes test results into an easily understandable format.
 *
 * - summarizeTestResults - A function that takes test results as input and returns a short summary.
 * - SummarizeTestResultsInput - The input type for the summarizeTestResults function.
 * - SummarizeTestResultsOutput - The return type for the summarizeTestResults function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTestResultsInputSchema = z.object({
  testName: z.string().describe('The name of the test.'),
  results: z.string().describe('The detailed results of the test.'),
});
export type SummarizeTestResultsInput = z.infer<typeof SummarizeTestResultsInputSchema>;

const SummarizeTestResultsOutputSchema = z.object({
  summary: z.string().describe('A short, easily understandable summary of the test results.'),
});
export type SummarizeTestResultsOutput = z.infer<typeof SummarizeTestResultsOutputSchema>;

export async function summarizeTestResults(input: SummarizeTestResultsInput): Promise<SummarizeTestResultsOutput> {
  return summarizeTestResultsFlow(input);
}

const summarizeTestResultsPrompt = ai.definePrompt({
  name: 'summarizeTestResultsPrompt',
  input: {schema: SummarizeTestResultsInputSchema},
  output: {schema: SummarizeTestResultsOutputSchema},
  prompt: `Summarize the following test results for the test named "{{{testName}}}" in a way that is easily understandable for someone without a medical background. Focus on key findings and avoid technical jargon.\n\nTest Results:\n{{{results}}}`,
});

const summarizeTestResultsFlow = ai.defineFlow(
  {
    name: 'summarizeTestResultsFlow',
    inputSchema: SummarizeTestResultsInputSchema,
    outputSchema: SummarizeTestResultsOutputSchema,
  },
  async input => {
    const {output} = await summarizeTestResultsPrompt(input);
    return output!;
  }
);
