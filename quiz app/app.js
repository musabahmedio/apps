var tree = document.getElementById("tree");
var questionsCount = document.getElementById("questionsCount");
var questionCount = document.getElementById("questionCount");
var question = document.getElementById("question");
var options = document.getElementById("options");
var main = document.getElementById("main");
var result = document.getElementById("result");
var progressBar = document.getElementById("collection");
var timer = document.getElementById("timer");

var questionData = [
  //QUESTIONS ARRAY
  {
    question: "What is the Full Form Of HTML",
    options: [
      "HyperText Makeup Language",
      "HyperText Markup Language",
      "HyperText Markup Lame",
      "HyperTate Markup Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "What does CSS stands for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet",
    ],
  },
  {
    question: "What does PHP stands for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor",
    ],
  },
  {
    question: "What does SQL stands for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language",
    ],
  },
  {
    question: "What year was JavaScript launched?",
    answer: "1995",
    options: ["1996", "1995", "1994", "None of the Above"],
  },
];

var currentQuestion = 0;
var score = 0;

var setIntervalFunc;
var intervalMinutes = 3;
var intervalSeconds = 0;
var percentage = (currentQuestion * 100) / questionData.length;

function timerFunction() {
  // console.log(intervalSeconds);
  startQuiz();
  if (intervalSeconds > 0) {
    intervalSeconds--;
    timer.innerHTML = `Time left: ${intervalMinutes}:${intervalSeconds}`;
    // console.log(`${intervalMinutes}: ${intervalSeconds}`);
  } else if (intervalMinutes > 0 && intervalSeconds === 0) {
    intervalMinutes--;
    intervalSeconds = 59;
    timer.innerHTML = `Time left: ${intervalMinutes}:${intervalSeconds}`;
  } else {
    clearInterval(setIntervalFunc);
    renderResult();
    console.log("Countdown finished.");
  }
}

function startTimer() {
  setIntervalFunc = setInterval(timerFunction, 1000);
}

function startDiv() {
  tree.innerHTML = "";
  tree.innerHTML = `
  <div id="startDiv" class="container-fluid p-5 my-5 section-1">
        <h1 class="my-5 heading-1 text-start">HTML QUIZ</h1>

        <div>
          <div class="row mb-4">
            
            <div class="col-6 h4 ">
              No. of Questions:
              <span class="badge rounded-pill badge-danger px-5">${questionData.length}</span>
            </div>
            <div class="col-6 h4 text-end">
              Time allowed:
              <span class="badge rounded-pill badge-danger">3 minutes</span>
            </div>
          </div>
        </div>
        <button class="btn btn-dark btn-lg w-30" type="button" onclick="startQuiz(); startTimer();">Start</button>
      </div>
  `;
}

startDiv();

function startQuiz() {
  main.style.display = "block";
  tree.style.display = "none";

  renderQuestion();

  tree.innerHTML = "";
}

function renderQuestion() {
  if (questionData.length > currentQuestion) {
    questionCount.innerHTML = `${currentQuestion + 1} of ${
      questionData.length
    }`;
    question.innerHTML = questionData[currentQuestion].question;
    // progressFunc();
    renderOptions();
  } else {
    clearInterval(setIntervalFunc);
    renderResult();
    console.log("end of questions");
  }
}

function renderOptions() {
  options.innerHTML = "";

  for (var i = 0; i < questionData[currentQuestion].options.length; i++) {
    options.innerHTML += `
    <div class="col-md-6 p-3">
            <button onclick="checkAns('${questionData[currentQuestion].options[i]}', '${questionData[currentQuestion].answer}')" type="button" class="custom-btn">
            ${questionData[currentQuestion].options[i]}
            </button>
          </div>`;
  }
}

function nextQuestion() {
  currentQuestion++;
  startQuiz();
}

function checkAns(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    console.log("correctAnswer");
    score++;
  } else {
    console.log("wrongAnswer");
  }
  console.log("CURREN T SCORE: " + score);
  nextQuestion();
}

function retake() {
  //   location.reload();

  currentQuestion = 0;
  renderQuestion();
  main.style.display = "block";
  result.style.display = "none";
  retake();
}

// renderQuestion();

function renderResult() {
  main.innerHTML = "";
  var percentage = `${(score * 100) / questionData.length}`;

  main.innerHTML = `
  <div id="quizDiv" class="container-fluid p-5 my-5 section-1">
  <h3 class="my-5 heading-1 text-center">HTML QUIZ RESULT</h1>
  <h2 class="my-5  heading-1 text-center"><i class="fa-solid fa-face-grin-beam-sweat" style="color: #fbc604;"></i></i></h2>
        <div class="row">
          <div class="col-6">
            <h3>Correct Answers: ${score} of ${questionData.length}</h3>
          </div>
          <div class="">
            <h3>You got: ${percentage}%</h3>
          </div>
          <div ><button btn btn-d btn-lg w-30" "type=button" onclick="retake()">Restart</button></div>
        </div>
      </div>`;
}
