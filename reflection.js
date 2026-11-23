export const pathways = {
  science: { name: 'Science' },
  arts: { name: 'Arts (Humanities)' },
  business: { name: 'Commercial (Business)' }
};

export const questions = [
  {
    prompt: 'Which school project would you most like to try?',
    options: [
      ['science', 'Grow two plants in different conditions and compare them.'],
      ['arts', 'Create a short play about life in your community.'],
      ['business', 'Plan a small school market and set prices.']
    ]
  },
  {
    prompt: 'What would you most like to find out about?',
    options: [
      ['arts', 'How people shape the rules we live by.'],
      ['business', 'Why the price of food changes in the market.'],
      ['science', 'How electricity reaches homes and schools.']
    ]
  },
  {
    prompt: 'Which role would you choose for a group activity?',
    options: [
      ['business', 'Keep track of what the group spends.'],
      ['science', 'Test an idea and record what happens.'],
      ['arts', 'Interview people and tell their story.']
    ]
  },
  {
    prompt: 'Which activity sounds most enjoyable?',
    options: [
      ['science', 'Work out why a simple machine moves.'],
      ['business', 'Compare products and decide which gives better value.'],
      ['arts', 'Discuss a character’s choices in a book or film.']
    ]
  },
  {
    prompt: 'What would you most like to learn how to do?',
    options: [
      ['arts', 'Make a painting, song or story that shares an idea.'],
      ['science', 'Use measurements to explain a change in nature.'],
      ['business', 'Work out the costs of making and selling something.']
    ]
  },
  {
    prompt: 'Which problem would you most like to work on?',
    options: [
      ['business', 'Help a school club make the most of a small budget.'],
      ['arts', 'Help people understand both sides of a community debate.'],
      ['science', 'Investigate which simple material keeps water cool longest.']
    ]
  }
];

export function reflect(answers) {
  const counts = { science: 0, arts: 0, business: 0 };
  let answered = 0;
  for (const answer of answers) {
    if (!Object.hasOwn(counts, answer)) continue;
    counts[answer] += 1;
    answered += 1;
  }

  const highest = Math.max(...Object.values(counts));
  const leading = Object.keys(counts).filter((pathway) => counts[pathway] === highest);
  return { counts, leading, answered };
}
