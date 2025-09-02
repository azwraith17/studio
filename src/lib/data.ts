
import type { ProfessionalAnalysisOutput } from "@/ai/flows/professional-analysis";

export type TestResult = {
  id: string;
  type: 'Depression' | 'Anxiety';
  date: string;
  score: number;
  maxScore: number;
  summary: string;
  rawResults: Record<string, number>; // Changed to record for better structure
  professionalAnalysis?: ProfessionalAnalysisOutput;
};

export const mockTestHistory: TestResult[] = [
  {
    id: 'test-003',
    type: 'Depression',
    date: '2024-07-15',
    score: 18,
    maxScore: 63,
    summary: 'The results indicate a moderate level of depressive symptoms. Key areas of concern include persistent sadness and significant changes in sleep patterns. It may be beneficial to monitor these symptoms closely.',
    rawResults: { 'd1': 2, 'd2': 3, 'd4': 3, 'd16': 3, 'd18': 2, 'd19': 3, 'd20': 2 },
    professionalAnalysis: {
      overview: 'The score of 18 on this BDI-based assessment suggests a moderate level of depression. The client is endorsing several clinically significant symptoms that warrant further exploration.',
      symptomAnalysis: 'The key symptom clusters appear to be cognitive and somatic. High scores on items related to pessimism (d2), loss of pleasure (d4), and concentration difficulty (d19) point to significant cognitive distress. Somatic symptoms like changes in sleep (d16) and fatigue (d20) are also pronounced.',
      potentialIndicators: 'The score of 3 for pessimism ("I feel my future is hopeless") is a potential red flag for hopelessness and should be carefully assessed in a clinical interview.',
      recommendations: 'A thorough clinical interview is recommended to explore the endorsed symptoms, particularly the extent of hopelessness. A risk assessment for self-harm is warranted. It may also be useful to assess for co-occurring anxiety, given the somatic complaints.'
    }
  },
  {
    id: 'test-002',
    type: 'Depression',
    date: '2024-06-20',
    score: 12,
    maxScore: 63,
    summary: 'The results suggest mild depressive symptoms. While the overall score is not high, some specific concerns like loss of pleasure were noted. Continued self-awareness is recommended.',
    rawResults: { 'd1': 1, 'd2': 2, 'd4': 2, 'd16': 2, 'd18': 1, 'd19': 2, 'd20': 2 },
    professionalAnalysis: {
      overview: 'The score of 12 indicates mild depression. The symptoms are likely causing some distress but may not be severely impacting daily functioning yet.',
      symptomAnalysis: 'The client reported mild symptoms across various domains. The most notable are pessimism and loss of pleasure. There are no severe symptom clusters at this time, but the pattern suggests a developing affective episode.',
      potentialIndicators: 'No critical items were endorsed at a high level. The results do not suggest immediate risk.',
      recommendations: 'Psychoeducation about depression and monitoring of symptoms is recommended. Exploring the context of the "loss of pleasure" could be a good starting point for therapy. Re-assessment in a few weeks would be prudent.'
    }
  },
  {
    id: 'test-001',
    type: 'Anxiety',
    date: '2024-05-10',
    score: 9,
    maxScore: 21,
    summary: 'The results indicate mild anxiety symptoms. Feelings of nervousness were reported on several days, but overall control over worrying seems to be maintained. No immediate concerns are highlighted.',
    rawResults: { 'a1': 2, 'a2': 1, 'a3': 2, 'a4': 1, 'a5': 1, 'a6': 1, 'a7': 1 },
    professionalAnalysis: {
      overview: 'A score of 9 on the GAD-7 suggests mild anxiety. The individual is experiencing symptoms, but they may be manageable.',
      symptomAnalysis: 'The primary symptoms reported are general nervousness and worrying about different things. The score for "not being able to stop or control worrying" is low, suggesting the client retains a sense of control despite the anxiety.',
      potentialIndicators: 'No critical indicators for severe anxiety or panic were noted in these results.',
      recommendations: 'Introduce foundational anxiety management techniques such as mindfulness or controlled breathing exercises. Further inquiry into the specific triggers for worry would be beneficial in a therapeutic setting.'
    }
  },
];

export type Psychologist = {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  clients: number;
};


export const mockPsychologists: Psychologist[] = [
  { id: 'psych-1', name: 'Dr. Evelyn Reed', email: 'e.reed@example.com', status: 'Active', clients: 15 },
  { id: 'psych-2', name: 'Dr. Samuel Green', email: 's.green@example.com', status: 'Active', clients: 12 },
  { id: 'psych-3', name: 'Dr. Olivia Blue', email: 'o.blue@example.com', status: 'Inactive', clients: 0 },
];


export type PsychologistClient = {
    id: string;
    name: string;
    email: string;
    lastTestDate: string;
};

export const mockPsychologistClients: PsychologistClient[] = [
    { id: 'client-1', name: 'Alice Johnson', email: 'alice@example.com', lastTestDate: '2024-07-15' },
    { id: 'client-2', name: 'Bob Williams', email: 'bob@example.com', lastTestDate: '2024-07-12' },
    { id: 'client-3', name: 'Charlie Brown', email: 'charlie@example.com', lastTestDate: '2024-06-28' },
    { id: 'client-4', name: 'Diana Miller', email: 'diana@example.com', lastTestDate: '2024-05-19' },
];
