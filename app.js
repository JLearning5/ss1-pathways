import { pathways, questions, reflect } from './reflection.js';

const app = document.querySelector('#reflection-app');
const form = document.querySelector('#questions');
const results = document.querySelector('#results');
const legend = document.querySelector('#question');
const choices = document.querySelector('#choices');
const progress = document.querySelector('#progress');
const progressLabel = document.querySelector('#progress-label');
const back = document.querySelector('#back');
const forward = document.querySelector('#forward');
const error = document.querySelector('#answer-error');
const answers = Array(questions.length).fill(null);
let index = 0;

function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

function renderQuestion({ focus = true } = {}) {
  results.hidden = true;
  form.hidden = false;
  error.hidden = true;
  const { prompt, options } = questions[index];
  progressLabel.textContent = `Question ${index + 1} of ${questions.length}`;
  progress.max = questions.length;
  progress.value = index + 1;
  legend.textContent = prompt;
  choices.replaceChildren();

  for (const [value, text] of [...options, ['unsure', 'I’m not sure']]) {
    const label = element('label', null, 'choice');
    const input = element('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = value;
    input.checked = value === answers[index];
    label.append(input, element('span', text));
    choices.append(label);
  }

  back.hidden = index === 0;
  forward.textContent = index === questions.length - 1 ? 'See my reflection' : 'Next question';
  if (focus) legend.focus();
}

function showResults() {
  const { counts, answered, leading } = reflect(answers);
  const title = element('h3', 'Your reflection', 'result-title');
  title.tabIndex = -1;
  const leadNames = leading.map((key) => pathways[key].name).join(' and ');
  let summary = 'Explore all three pathways. Try one activity from each and see what you enjoy.';
  if (answered >= 3 && leading.length === 1) {
    summary = `Your choices were most often linked to ${leadNames}. Start there and compare it with another pathway you’re curious about.`;
  } else if (answered >= 3 && leading.length === 2) {
    summary = `Your choices were equally linked to ${leadNames}. Explore both and see which subjects you’d like to try.`;
  }

  const list = element('ul', null, 'result-list');
  for (const [key, pathway] of Object.entries(pathways)) {
    const row = element('li', null, key);
    const link = element('a', pathway.name);
    link.href = `#${key}`;
    row.append(link, element('span', `${counts[key]} ${counts[key] === 1 ? 'answer' : 'answers'}`));
    list.append(row);
  }
  const restart = element('button', 'Start over', 'button secondary');
  restart.type = 'button';
  restart.addEventListener('click', () => {
    answers.fill(null);
    index = 0;
    renderQuestion();
  });
  const review = element('button', 'Review answers', 'button secondary');
  review.type = 'button';
  review.addEventListener('click', () => {
    index = 0;
    renderQuestion();
  });
  const actions = element('div', null, 'actions');
  actions.append(review, restart);
  results.replaceChildren(
    title,
    element('p', summary),
    list,
    element('p', 'Next step: ask your school which subjects are available, then talk through your interests and schoolwork with a teacher or trusted adult.'),
    element('p', 'Each activity choice adds one to a pathway. “I’m not sure” adds zero. Use these counts as a starting point for discussion.', 'small-note'),
    actions
  );
  form.hidden = true;
  results.hidden = false;
  title.focus();
}

choices.addEventListener('change', (event) => {
  answers[index] = event.target.value;
  error.hidden = true;
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (answers[index] === null) {
    error.hidden = false;
    choices.querySelector('input').focus();
    return;
  }

  if (index === questions.length - 1) {
    showResults();
    return;
  }

  index += 1;
  renderQuestion();
});

back.addEventListener('click', () => {
  if (index === 0) return;
  index -= 1;
  renderQuestion();
});

app.hidden = false;
renderQuestion({ focus: false });

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {
    // Browsers that block caching can still use the guide online.
  });
}
