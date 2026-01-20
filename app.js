let currentQuestion = 0;
let answers = [];

// DOM elements
const introSection = document.getElementById('intro');
const questionnaireSection = document.getElementById('questionnaire');
const resultsSection = document.getElementById('results');

const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

const questionText = document.getElementById('questionText');
const currentQSpan = document.getElementById('currentQ');
const progressFill = document.getElementById('progressFill');
const answerButtons = document.querySelectorAll('.btn-answer');

// --- START ---
startBtn.addEventListener('click', startTest);
restartBtn.addEventListener('click', restartTest);

answerButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    const value = e.target.dataset.answer === 'true';
    handleAnswer(value);
  });
});

function startTest() {
  if (!Array.isArray(questions) || questions.length === 0) {
    alert('Questions are not loaded.');
    return;
  }

  currentQuestion = 0;
  answers = [];

  introSection.classList.add('hidden');
  questionnaireSection.classList.remove('hidden');

  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  const q = questions[currentQuestion];

  // поддержка строк и объектов
  if (typeof q === 'string') {
    questionText.textContent = q;
  } else if (q && typeof q === 'object' && q.text) {
    questionText.textContent = q.text;
  } else {
    questionText.textContent = 'Invalid question format';
  }

  currentQSpan.textContent = currentQuestion + 1;
  updateProgress();
}

function handleAnswer(answer) {
  answers[currentQuestion] = answer;
  currentQuestion++;
  showQuestion();
}

function updateProgress() {
  const percent = ((currentQuestion + 1) / questions.length) * 100;
  progressFill.style.width = percent + '%';
}

// --- RESULTS ---
function calculateScores() {
  const scores = {
    sociability: 0,
    organization: 0,
    focusOnSubject: 0,
    intelligence: 0,
    motivationOfApproval: 0
  };

  Object.keys(answerKey).forEach(scale => {
    Object.keys(answerKey[scale]).forEach(qNum => {
      const index = parseInt(qNum, 10) - 1;
      if (answers[index] === answerKey[scale][qNum]) {
        scores[scale]++;
      }
    });
  });

  return scores;
}

function showResults() {
  questionnaireSection.classList.add('hidden');
  resultsSection.classList.remove('hidden');

  const scores = calculateScores();

  displayScores(scores);
  displayChart(scores);
  displayDominantProfile(scores);
  displayDetailedDescriptions(scores);

  const reliabilityWarning = document.getElementById('reliabilityWarning');
  if (scores.motivationOfApproval > 7) {
    reliabilityWarning.classList.remove('hidden');
  }
}

function restartTest() {
  currentQuestion = 0;
  answers = [];
  resultsSection.classList.add('hidden');
  introSection.classList.remove('hidden');
  progressFill.style.width = '0%';
}
