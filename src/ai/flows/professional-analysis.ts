'use server';
/**
 * @fileOverview Provides a professional psychological analysis of test results.
 *
 * - professionalAnalysis - A function that takes test results and returns a detailed clinical analysis.
 * - ProfessionalAnalysisInput - The input type for the professionalAnalysis function.
 * - ProfessionalAnalysisOutput - The return type for the professionalAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ProfessionalAnalysisInputSchema = z.object({
  testName: z.string().describe('The name of the test (e.g., "Depression (BDI-based)", "Anxiety (GAD-7-based)").'),
  answers: z.record(z.string(), z.number()).describe('An object mapping question IDs to the numerical score for each answer.'),
  questions: z.record(z.string(), z.string()).describe('An object mapping question IDs to the question text.'),
  score: z.number().describe('The total score for the test.'),
  maxScore: z.number().describe('The maximum possible score for the test.'),
});
export type ProfessionalAnalysisInput = z.infer<typeof ProfessionalAnalysisInputSchema>;

export const ProfessionalAnalysisOutputSchema = z.object({
  overview: z.string().describe('A clinical overview of the results, including score interpretation and severity level.'),
  symptomAnalysis: z.string().describe('A detailed analysis of symptom clusters and specific responses that are clinically significant.'),
  potentialIndicators: z.string().describe('Highlights any critical items or potential red flags (e.g., responses related to self-harm).'),
  recommendations: z.string().describe('Provides recommendations for the clinician, such as areas for further inquiry or potential follow-up assessments.'),
});
export type ProfessionalAnalysisOutput = z.infer<typeof ProfessionalAnalysisOutputSchema>;

export async function professionalAnalysis(input: ProfessionalAnalysisInput): Promise<ProfessionalAnalysisOutput> {
  return professionalAnalysisFlow(input);
}

const professionalAnalysisPrompt = ai.definePrompt({
  name: 'professionalAnalysisPrompt',
  input: {schema: ProfessionalAnalysisInputSchema},
  output: {schema: ProfessionalAnalysisOutputSchema},
  prompt: `You are a clinical psychologist providing a detailed analysis of a patient's self-reported assessment. The analysis should be written for another mental health professional.

Test Name: {{{testName}}}
Total Score: {{{score}}} out of {{{maxScore}}}

Detailed Answers:
{{#each questions}}
- Question: "{{this}}" (ID: {{@key}})
  - Score: {{lookup ../answers @key}}
{{/each}}

Based on the provided data, generate a professional analysis covering the following sections:
1.  **Overview**: Interpret the total score in the context of the test's scoring guidelines. State the likely severity level (e.g., Minimal, Mild, Moderate, Severe).
2.  **Symptom Analysis**: Analyze the pattern of responses. Identify key symptom clusters (e.g., cognitive, affective, somatic). Point out which specific symptoms appear most pronounced based on the highest-scoring answers.
3.  **Potential Indicators**: Scrutinize the answers for any critical items that warrant immediate attention, such as endorsement of items related to self-harm, hopelessness, or panic.
4.  **Recommendations**: Suggest next steps for the clinician. This could include specific topics to explore further in a clinical interview, differential diagnosis considerations, or recommendations for further assessment.

Do not include any personal opinions or information that is not directly supported by the test data. The tone should be objective, clinical, and professional.
`,
});

const professionalAnalysisFlow = ai.defineFlow(
  {
    name: 'professionalAnalysisFlow',
    inputSchema: ProfessionalAnalysisInputSchema,
    outputSchema: ProfessionalAnalysisOutputSchema,
  },
  async input => {
    const {output} = await professionalAnalysisPrompt(input);
    return output!;
  }
);
