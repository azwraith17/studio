export type TestResult = {
  id: string;
  type: 'Depression' | 'Anxiety';
  date: string;
  score: number;
  maxScore: number;
  summary: string;
  rawResults: string;
};

export const mockTestHistory: TestResult[] = [
  {
    id: 'test-003',
    type: 'Depression',
    date: '2024-07-15',
    score: 18,
    maxScore: 21,
    summary: 'The results indicate a moderate level of depressive symptoms. Key areas of concern include persistent sadness and significant changes in sleep patterns. It may be beneficial to monitor these symptoms closely.',
    rawResults: 'Sadness: 2, Pessimism: 3, Loss of Pleasure: 3, Sleep Change: 3, Appetite Change: 2, Concentration: 3, Fatigue: 2'
  },
  {
    id: 'test-002',
    type: 'Depression',
    date: '2024-06-20',
    score: 12,
    maxScore: 21,
    summary: 'The results suggest mild depressive symptoms. While the overall score is not high, some specific concerns like loss of pleasure were noted. Continued self-awareness is recommended.',
    rawResults: 'Sadness: 1, Pessimism: 2, Loss of Pleasure: 2, Sleep Change: 2, Appetite Change: 1, Concentration: 2, Fatigue: 2'
  },
  {
    id: 'test-001',
    type: 'Anxiety',
    date: '2024-05-10',
    score: 9,
    maxScore: 21,
    summary: 'The results indicate mild anxiety symptoms. Feelings of nervousness were reported on several days, but overall control over worrying seems to be maintained. No immediate concerns are highlighted.',
    rawResults: 'Nervousness: 2, Uncontrolled Worry: 1, Worrying Too Much: 2, Trouble Relaxing: 1, Restlessness: 1, Irritability: 1, Feeling Afraid: 1'
  },
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
