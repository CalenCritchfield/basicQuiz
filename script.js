document.querySelector("video").playbackRate = 0.5;

// Questions and Answers
const questions = [
  {
    question: "How would you rate your work-life balance right now?",
    answers: [
      {
        text: "I have it down to a science – work-life harmony is my middle name!",
        points: 4,
      },
      { text: "It’s a bit of a juggle, but I manage.", points: 3 },
      { text: "It’s a challenge, but I’m working on it.", points: 2 },
      { text: "What work-life balance? I live to work.", points: 1 },
    ],
  },
  {
    question: "What’s your biggest goal for 2025?",
    answers: [
      { text: "To get promoted and lead a team.", points: 4 },
      { text: "To expand my skill set and tackle new challenges.", points: 3 },
      { text: "To find more balance and avoid burnout.", points: 2 },
      { text: "To start a new side hustle or business.", points: 1 },
    ],
  },
  {
    question: "How do you usually handle setbacks at work?",
    answers: [
      {
        text: "I bounce back quickly and find new ways to succeed.",
        points: 4,
      },
      { text: "I take a step back and reassess my approach.", points: 3 },
      { text: "I seek support from colleagues or mentors.", points: 2 },
      {
        text: "I tend to dwell on them and struggle to move forward.",
        points: 1,
      },
    ],
  },
  {
    question: "Which statement best describes your approach to learning?",
    answers: [
      { text: "I’m always seeking new knowledge and skills.", points: 4 },
      { text: "I learn as needed to get the job done.", points: 3 },
      {
        text: "I prefer hands-on experience over formal education.",
        points: 2,
      },
      {
        text: "I’m comfortable with what I know and don’t seek new learning.",
        points: 1,
      },
    ],
  },
  {
    question: "How do you usually approach networking?",
    answers: [
      {
        text: "I love meeting new people and building connections.",
        points: 4,
      },
      { text: "I network strategically to advance my career.", points: 3 },
      {
        text: "I find networking events overwhelming or intimidating.",
        points: 2,
      },
      {
        text: "I prefer to focus on my work rather than networking.",
        points: 1,
      },
    ],
  },
  {
    question: "How do you feel about taking on new responsibilities at work?",
    answers: [
      { text: "I thrive on new challenges and responsibilities.", points: 4 },
      { text: "I’m open to new things if it aligns with my goals.", points: 3 },
      { text: "I prefer to stick with what I know and do well.", points: 2 },
      {
        text: "I feel overwhelmed or anxious about new responsibilities.",
        points: 1,
      },
    ],
  },
  {
    question: "How do you typically deal with stress at work?",
    answers: [
      {
        text: "I have healthy coping mechanisms and manage stress well.",
        points: 4,
      },
      {
        text: "I take breaks and practice self-care to reduce stress.",
        points: 3,
      },
      { text: "I tend to power through and ignore the stress.", points: 2 },
      {
        text: "I struggle to cope with stress and it impacts my work.",
        points: 1,
      },
    ],
  },
  {
    question: "How do you approach feedback and criticism at work?",
    answers: [
      { text: "I welcome feedback and use it to improve.", points: 4 },
      {
        text: "I appreciate constructive criticism and learn from it.",
        points: 3,
      },
      {
        text: "I find feedback challenging but try to take it in stride.",
        points: 2,
      },
      { text: "I avoid feedback or take it personally.", points: 1 },
    ],
  },
  {
    question: "How do you feel about your current job or career path?",
    answers: [
      {
        text: "I’m passionate about my work and see a bright future.",
        points: 4,
      },
      {
        text: "I’m content with my job but open to new opportunities.",
        points: 3,
      },
      { text: "I feel stuck or unsure about my career direction.", points: 2 },
      { text: "I’m unhappy in my job and looking for a change.", points: 1 },
    ],
  },
  {
    question:
      "How do you approach work-life boundaries, such as checking emails after hours?",
    answers: [
      { text: "I set clear boundaries and prioritize self-care.", points: 4 },
      {
        text: "I try to disconnect after work hours but struggle at times.",
        points: 3,
      },
      {
        text: "I find it hard to disconnect from work and am always on.",
        points: 2,
      },
      {
        text: "I’m constantly connected to work and struggle to find balance.",
        points: 1,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const resultImage = document.getElementById("result-image");
const resultHeader = document.getElementById("result-header");
const quiz = document.querySelector(".quiz");

let currentQuestionIndex = 0;
let totalPoints = 0;
let questionPoints = [];
let currentAnswer = null;

// Start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  totalPoints = 0;
  questionPoints = new Array(questions.length).fill(0);
  nextBtn.innerHTML = "Next";
  nextBtn.style.display = "none";
  showQuestion();
}

// Show the current question
function showQuestion() {
  answerButton.innerHTML = "";
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = `${questionNo}. ${currentQuestion.question}`;

  currentAnswer = null;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => handleAnswer(button, answer));
    answerButton.appendChild(button);
  });
}

// Handle answer selection
function handleAnswer(button, answer) {
  const buttons = answerButton.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = false;
  });

  if (currentAnswer) {
    currentAnswer.button.classList.remove("selected");
    totalPoints -= questionPoints[currentQuestionIndex];
  }

  button.classList.add("selected");
  questionPoints[currentQuestionIndex] = answer.points;
  totalPoints += answer.points;

  currentAnswer = { button, points: answer.points };
  nextBtn.style.display = "inline-block";
}

// Move to the next question or show results
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
    nextBtn.style.display = "none";
  } else {
    showResults();
  }
});

// Display the result based on total points
function showResults() {
  console.log("showResults function reached");
  console.log("Total points: ", totalPoints);

  questionElement.innerText = "Quiz Completed!";
  quiz.style.margin = "10px";
  quiz.style.padding = "0px";
  let resultMessage = "";
  let imagePath = "";
  answerButton.innerHTML = "";
  resultElement.innerHTML = "";
  resultHeader.innerHTML = "";
  nextBtn.style.display = "none";

  // Define the result message and image based on total points
  if (totalPoints >= 31) {
    imagePath = "images/quiz-pics/superStar.png";
    resultHeader.innerHTML = "<h2><strong>Superstar Status!</strong></h2>";
    resultMessage =
      "🎉 You are poised for an exceptional 2025! Your work ethic, ambition, and resilience will propel you to new heights next year. Get ready for promotions, growth, and recognition. Keep leading with confidence!";
  } else if (totalPoints >= 24) {
    imagePath = "images/quiz-pics/momentum.png";
    resultHeader.innerHTML = "<h2><strong>Momentum Maker</strong></h2>";
    resultMessage =
      "🚀 You’re on track for steady success! With your mix of hard work and strategic thinking, you’ll make significant strides in your career in 2025. Keep pushing for those big goals, and you’ll reach them!";
  } else if (totalPoints >= 16) {
    imagePath = "images/quiz-pics/balance.png";
    resultHeader.innerHTML = "<h2><strong>Balancing Act</strong></h2>";
    resultMessage =
      "⚖️ You’re finding your rhythm, but there are areas for growth. If you can work on improving work-life balance, networking, and embracing new challenges, 2025 could be a year of steady progress and self-discovery.";
  } else {
    imagePath = "images/quiz-pics/workInProgress.png";
    resultHeader.innerHTML = "<h2><strong>Work in Progress</strong></h2>";
    resultMessage =
      "⏳ 2025 might be a year of reflection and recalibration for you. It’s a great time to reassess your goals, tackle new skills, and develop strategies for overcoming challenges. Success is coming, but it might take a little time.";
  }

  //display image
  const resultImage = document.getElementById("result-image");
  resultImage.src = imagePath;
  resultImage.style.display = "block";

  // Display the result message and header
  resultElement.innerText = resultMessage;
  resultHeader.style.display = "block";
}

// Start the quiz when the page loads
startQuiz();
