// ---------- Quiz data ----------
const questions = [
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Earth", "Jupiter", "Saturn", "Neptune"],
    correct: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correct: 2
  },
  {
    question: "What is the smallest prime number?",
    answers: ["0", "1", "2", "3"],
    correct: 2
  },
  {
    question: "Which language runs natively in a web browser?",
    answers: ["Python", "JavaScript", "C++", "Java"],
    correct: 1
  },
  {
    question: "What is the capital of Australia?",
    answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correct: 2
  },
  {
    question: "How many continents are there on Earth?",
    answers: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    question: "What gas do plants primarily absorb for photosynthesis?",
    answers: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correct: 2
  },
  {
    question: "Which ocean is the largest by surface area?",
    answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3
  },
  {
    question: "In what year did the first man land on the moon?",
    answers: ["1965", "1969", "1972", "1958"],
    correct: 1
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: ["Ag", "Gd", "Au", "Go"],
    correct: 2
  }
];

// ---------- State ----------
let currentQuestion = 0;
let score = 0;
let answerLocked = false;

// ---------- Elements ----------
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionCountEl = document.getElementById("question-count");
const scoreLiveEl = document.getElementById("score-live");
const questionTextEl = document.getElementById("question-text");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");

const finalScoreEl = document.getElementById("final-score");
const finalMessageEl = document.getElementById("final-message");

// ---------- Events ----------
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", showNextQuestion);
restartBtn.addEventListener("click", startQuiz);

// ---------- Functions ----------
function startQuiz() {
  currentQuestion = 0;
  score = 0;
  startScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestion();
}

function renderQuestion() {
  answerLocked = false;
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");

  const q = questions[currentQuestion];
  questionCountEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreLiveEl.textContent = `Score: ${score}`;
  questionTextEl.textContent = q.question;

  answersEl.innerHTML = "";
  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(index, btn));
    answersEl.appendChild(btn);
  });
}

function selectAnswer(selectedIndex, btnEl) {
  if (answerLocked) return;
  answerLocked = true;

  const q = questions[currentQuestion];
  const allButtons = answersEl.querySelectorAll(".answer-btn");

  allButtons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.correct) {
      btn.classList.add("correct");
    }
  });

  if (selectedIndex === q.correct) {
    score++;
    feedbackEl.textContent = "Correct.";
  } else {
    btnEl.classList.add("incorrect");
    feedbackEl.textContent = `Not quite. The answer was "${q.answers[q.correct]}".`;
  }

  scoreLiveEl.textContent = `Score: ${score}`;
  nextBtn.classList.remove("hidden");
  nextBtn.textContent =
    currentQuestion === questions.length - 1 ? "See results" : "Next question";
}

function showNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");

  finalScoreEl.textContent = `${score} / ${questions.length}`;

  let message;
  if (score === questions.length) {
    message = "Clean sweep. Nothing left to chalk up.";
  } else if (score >= questions.length * 0.7) {
    message = "Solid round. You know your stuff.";
  } else if (score >= questions.length * 0.4) {
    message = "Decent effort. A few gaps to fill in.";
  } else {
    message = "Rough round. Wipe the board and go again.";
  }
  finalMessageEl.textContent = message;
}
