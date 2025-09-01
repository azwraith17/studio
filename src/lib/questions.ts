export type QuestionOption = {
  text: string;
  score: number;
};

export type Question = {
  id: string;
  text: string;
  options: QuestionOption[];
};

export const depressionQuestions: Question[] = [
  {
    id: "d1",
    text: "Sadness",
    options: [
      { text: "I do not feel sad.", score: 0 },
      { text: "I feel sad much of the time.", score: 1 },
      { text: "I am sad all the time.", score: 2 },
      { text: "I am so sad or unhappy that I can't stand it.", score: 3 },
    ],
  },
  {
    id: "d2",
    text: "Pessimism",
    options: [
      { text: "I am not discouraged about my future.", score: 0 },
      { text: "I feel more discouraged about my future than I used to be.", score: 1 },
      { text: "I do not expect things to work out for me.", score: 2 },
      { text: "I feel my future is hopeless and will only get worse.", score: 3 },
    ],
  },
  {
    id: "d3",
    text: "Loss of Pleasure",
    options: [
      { text: "I get as much pleasure as I ever did from the things I enjoy.", score: 0 },
      { text: "I don't enjoy things as much as I used to.", score: 1 },
      { text: "I get very little pleasure from the things I used to enjoy.", score: 2 },
      { text: "I can't get any pleasure from the things I used to enjoy.", score: 3 },
    ],
  },
  {
    id: "d4",
    text: "Changes in Sleep",
    options: [
      { text: "I have not experienced any change in my sleeping pattern.", score: 0 },
      { text: "I sleep somewhat more or less than usual.", score: 1 },
      { text: "I sleep a lot more or a lot less than usual.", score: 2 },
      { text: "I sleep most of the day or wake up 1-2 hours early and can't get back to sleep.", score: 3 },
    ],
  },
  {
    id: "d5",
    text: "Changes in Appetite",
    options: [
      { text: "I have not experienced any change in my appetite.", score: 0 },
      { text: "My appetite is somewhat less or greater than usual.", score: 1 },
      { text: "My appetite is much less or much greater than usual.", score: 2 },
      { text: "I have no appetite at all or I crave food all the time.", score: 3 },
    ],
  },
  {
    id: "d6",
    text: "Concentration Difficulty",
    options: [
      { text: "I can concentrate as well as ever.", score: 0 },
      { text: "I can't concentrate as well as usual.", score: 1 },
      { text: "It's hard to keep my mind on anything for very long.", score: 2 },
      { text: "I find I can't concentrate on anything.", score: 3 },
    ],
  },
  {
    id: "d7",
    text: "Tiredness or Fatigue",
    options: [
      { text: "I am no more tired or fatigued than usual.", score: 0 },
      { text: "I get more tired or fatigued more easily than usual.", score: 1 },
      { text: "I am too tired or fatigued to do a lot of the things I used to do.", score: 2 },
      { text: "I am too tired or fatigued to do most of the things I used to do.", score: 3 },
    ],
  },
];


export const anxietyQuestions: Question[] = [
  {
    id: 'a1',
    text: 'Feeling nervous, anxious, or on edge',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 },
    ],
  },
  {
    id: 'a2',
    text: 'Not being able to stop or control worrying',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 },
    ],
  },
  {
    id: 'a3',
    text: 'Worrying too much about different things',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 },
    ],
  },
  {
    id: 'a4',
    text: 'Trouble relaxing',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 },
    ],
  },
  {
    id: 'a5',
    text: 'Being so restless that it is hard to sit still',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 },
    ],
  },
  {
    id: 'a6',
    text: 'Becoming easily annoyed or irritable',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 },
    ],
  },
  {
    id: 'a7',
    text: 'Feeling afraid, as if something awful might happen',
    options: [
      { text: 'Not at all', score: 0 },
      { text: 'Several days', score: 1 },
      { text: 'More than half the days', score: 2 },
      { text: 'Nearly every day', score: 3 },
    ],
  },
];
