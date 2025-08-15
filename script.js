 const quizData = [
  {
    question: "What is the binary representation of 5?",
    type: "single",
    answers: ["100", "101", "110", "111"],
    correct: [1]
  },
  {
    question: "Which one is NOT a programming language?",
    type: "single",
    answers: ["Python", "HTML", "Java", "C++"],
    correct: [1]
  },
  {
    question: "Fill in the blank: The chemical symbol of water is ____.",
    type: "fill",
    answers: ["H2O"],
    correct: [0]
  },
  {
    question: "Which of these are operating systems?",
    type: "multi",
    answers: ["Linux", "Windows", "Python", "MacOS"],
    correct: [0, 1, 3]
  },
  {
    question: "What is the capital of France?",
    type: "single",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: [2]
  },
  {
    question: "Which data structure uses FIFO principle?",
    type: "single",
    answers: ["Stack", "Queue", "Tree", "Graph"],
    correct: [1]
  },
  {
    question: "Fill in the blank: The SI unit of force is ____.",
    type: "fill",
    answers: ["Newton"],
    correct: [0]
  },
  {
    question: "Which of the following are web browsers?",
    type: "multi",
    answers: ["Chrome", "Firefox", "Opera", "React"],
    correct: [0, 1, 2]
  },
  {
    question: "Which is NOT a database?",
    type: "single",
    answers: ["MySQL", "Oracle", "MongoDB", "Java"],
    correct: [3]
  },
  {
    question: "Fill in the blank: The square root of 64 is ____.",
    type: "fill",
    answers: ["8"],
    correct: [0]
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("timer").textContent = `Time: ${timeLeft}s`;

  const questionElement = document.getElementById("question");
  const answersElement = document.getElementById("answers");
  answersElement.innerHTML = "";

  const current = quizData[currentQuestion];
  questionElement.textContent = current.question;

  if (current.type === "single" || current.type === "multi") {
    current.answers.forEach((ans, index) => {
      const button = document.createElement("button");
      button.textContent = ans;
      button.classList.add("answer-btn");
      button.onclick = () => selectAnswer(index, button);
      answersElement.appendChild(button);
    });
  } else if (current.type === "fill") {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type your answer";
    input.id = "fillAnswer";
    answersElement.appendChild(input);
  }

  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

let selectedAnswers = [];

function selectAnswer(index, button) {
  const current = quizData[currentQuestion];
  if (current.type === "single") {
    selectedAnswers = [index];
    document.querySelectorAll(".answer-btn").forEach(btn => btn.style.background = "#3498db");
    button.style.background = "#2ecc71";
  } else {
    if (selectedAnswers.includes(index)) {
      selectedAnswers = selectedAnswers.filter(i => i !== index);
      button.style.background = "#3498db";
    } else {
      selectedAnswers.push(index);
      button.style.background = "#2ecc71";
    }
  }
}

function nextQuestion() {
  checkAnswer();
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function checkAnswer() {
  const current = quizData[currentQuestion];
  if (current.type === "fill") {
    const userAnswer = document.getElementById("fillAnswer")?.value.trim().toLowerCase();
    if (userAnswer === current.answers[0].toLowerCase()) {
      score++;
    }
  } else if (JSON.stringify(selectedAnswers.sort()) === JSON.stringify(current.correct.sort())) {
    score++;
  }
  selectedAnswers = [];
}

function showResult() {
  document.querySelector(".quiz-container").innerHTML = `
    <h2>Your Score: ${score} / ${quizData.length}</h2>
    <button onclick="location.reload()">Play Again</button>
  `;
}

window.onload = loadQuestion;