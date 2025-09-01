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
    id: 'd3',
    text: 'Past Failure',
    options: [
      {text: 'I do not feel like a failure.', score: 0},
      {text: 'I have failed more than I should have.', score: 1},
      {text: 'As I look back, I see a lot of failures.', score: 2},
      {text: 'I feel I am a total failure as a person.', score: 3},
    ],
  },
  {
    id: "d4",
    text: "Loss of Pleasure",
    options: [
      { text: "I get as much pleasure as I ever did from the things I enjoy.", score: 0 },
      { text: "I don't enjoy things as much as I used to.", score: 1 },
      { text: "I get very little pleasure from the things I used to enjoy.", score: 2 },
      { text: "I can't get any pleasure from the things I used to enjoy.", score: 3 },
    ],
  },
  {
    id: 'd5',
    text: 'Guilty Feelings',
    options: [
      {text: 'I don\'t feel particularly guilty.', score: 0},
      {text: 'I feel guilty over many things I have done or should have done.', score: 1},
      {text: 'I feel quite guilty most of the time.', score: 2},
      {text: 'I feel guilty all of the time.', score: 3},
    ],
  },
  {
    id: 'd6',
    text: 'Punishment Feelings',
    options: [
      {text: 'I don\'t feel I am being punished.', score: 0},
      {text: 'I feel I may be punished.', score: 1},
      {text: 'I expect to be punished.', score: 2},
      {text: 'I feel I am being punished.', score: 3},
    ],
  },
  {
    id: 'd7',
    text: 'Self-Dislike',
    options: [
      {text: 'I feel the same about myself as ever.', score: 0},
      {text: 'I have lost confidence in myself.', score: 1},
      {text: 'I am disappointed in myself.', score: 2},
      {text: 'I dislike myself.', score: 3},
    ],
  },
  {
    id: 'd8',
    text: 'Self-Criticalness',
    options: [
      {text: 'I don\'t criticize or blame myself more than usual.', score: 0},
      {text: 'I am more critical of myself than I used to be.', score: 1},
      {text: 'I criticize myself for all of my faults.', score: 2},
      {text: 'I blame myself for everything bad that happens.', score: 3},
    ],
  },
  {
    id: 'd9',
    text: 'Suicidal Thoughts or Wishes',
    options: [
      {text: 'I don\'t have any thoughts of killing myself.', score: 0},
      {text: 'I have thoughts of killing myself, but I would not carry them out.', score: 1},
      {text: 'I would like to kill myself.', score: 2},
      {text: 'I would kill myself if I had the chance.', score: 3},
    ],
  },
  {
    id: 'd10',
    text: 'Crying',
    options: [
      {text: 'I don\'t cry any more than usual.', score: 0},
      {text: 'I cry more now than I used to.', score: 1},
      {text: 'I cry over every little thing.', score: 2},
      {text: 'I feel like crying, but I can\'t.', score: 3},
    ],
  },
  {
    id: 'd11',
    text: 'Agitation',
    options: [
      {text: 'I am no more restless or wound up than usual.', score: 0},
      {text: 'I feel more restless or wound up than usual.', score: 1},
      {text: 'I am so restless or agitated that it\'s hard to stay still.', score: 2},
      {text: 'I am so restless or agitated that I have to keep moving or doing something.', score: 3},
    ],
  },
  {
    id: 'd12',
    text: 'Loss of Interest',
    options: [
      {text: 'I have not lost interest in other people or activities.', score: 0},
      {text: 'I am less interested in other people or things than before.', score: 1},
      {text: 'I have lost most of my interest in other people or things.', score: 2},
      {text: 'It\'s hard to get interested in anything.', score: 3},
    ],
  },
  {
    id: 'd13',
    text: 'Indecisiveness',
    options: [
      {text: 'I make decisions about as well as ever.', score: 0},
      {text: 'I find it more difficult to make decisions than usual.', score: 1},
      {text: 'I have much greater difficulty in making decisions than I used to.', score: 2},
      {text: 'I can\'t make any decisions at all anymore.', score: 3},
    ],
  },
  {
    id: 'd14',
    text: 'Worthlessness',
    options: [
      {text: 'I do not feel I am worthless.', score: 0},
      {text: 'I don\'t consider myself as worthwhile and useful as I used to.', score: 1},
      {text: 'I feel more worthless as compared to other people.', score: 2},
      {text: 'I feel utterly worthless.', score: 3},
    ],
  },
  {
    id: 'd15',
    text: 'Loss of Energy',
    options: [
      {text: 'I have as much energy as ever.', score: 0},
      {text: 'I have less energy than I used to have.', score: 1},
      {text: 'I don\'t have enough energy to do very much.', score: 2},
      {text: 'I don\'t have enough energy to do anything.', score: 3},
    ],
  },
  {
    id: "d16",
    text: "Changes in Sleep",
    options: [
      { text: "I have not experienced any change in my sleeping pattern.", score: 0 },
      { text: "I sleep somewhat more or less than usual.", score: 1 },
      { text: "I sleep a lot more or a lot less than usual.", score: 2 },
      { text: "I sleep most of the day or wake up 1-2 hours early and can't get back to sleep.", score: 3 },
    ],
  },
  {
    id: 'd17',
    text: 'Irritability',
    options: [
      {text: 'I am no more irritable than usual.', score: 0},
      {text: 'I am more irritable than usual.', score: 1},
      {text: 'I am much more irritable than usual.', score: 2},
      {text: 'I am irritable all the time.', score: 3},
    ],
  },
  {
    id: "d18",
    text: "Changes in Appetite",
    options: [
      { text: "I have not experienced any change in my appetite.", score: 0 },
      { text: "My appetite is somewhat less or greater than usual.", score: 1 },
      { text: "My appetite is much less or much greater than usual.", score: 2 },
      { text: "I have no appetite at all or I crave food all the time.", score: 3 },
    ],
  },
  {
    id: "d19",
    text: "Concentration Difficulty",
    options: [
      { text: "I can concentrate as well as ever.", score: 0 },
      { text: "I can't concentrate as well as usual.", score: 1 },
      { text: "It's hard to keep my mind on anything for very long.", score: 2 },
      { text: "I find I can't concentrate on anything.", score: 3 },
    ],
  },
  {
    id: "d20",
    text: "Tiredness or Fatigue",
    options: [
      { text: "I am no more tired or fatigued than usual.", score: 0 },
      { text: "I get more tired or fatigued more easily than usual.", score: 1 },
      { text: "I am too tired or fatigued to do a lot of the things I used to do.", score: 2 },
      { text: "I am too tired or fatigued to do most of the things I used to do.", score: 3 },
    ],
  },
  {
    id: 'd21',
    text: 'Loss of Interest in Sex',
    options: [
      {text: 'I have not noticed any recent change in my interest in sex.', score: 0},
      {text: 'I am less interested in sex than I used to be.', score: 1},
      {text: 'I am much less interested in sex now.', score: 2},
      {text: 'I have lost interest in sex completely.', score: 3},
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
