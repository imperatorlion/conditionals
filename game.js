const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const levelLabel = document.getElementById("level-label");
const scoreLabel = document.getElementById("score-label");

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const questionScreen = document.getElementById("question-screen");
const questionLevel = document.getElementById("question-level");
const questionText = document.getElementById("question-text");
const questionChoices = document.getElementById("question-choices");
const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const submitAnswer = document.getElementById("submit-answer");
const questionFeedback = document.getElementById("question-feedback");
const nextQuestion = document.getElementById("next-question");
const levelCompleteScreen = document.getElementById("level-complete-screen");
const startMinigame = document.getElementById("start-minigame");
const minigameScreen = document.getElementById("minigame-screen");
const minigameCanvas = document.getElementById("minigame-canvas");
const minigameStatus = document.getElementById("minigame-status");
const continueStory = document.getElementById("continue-story");
const gameCompleteScreen = document.getElementById("game-complete-screen");
const finalScore = document.getElementById("final-score");
const restartGame = document.getElementById("restart-game");

const tileSize = 48;
const gridWidth = 16;
const gridHeight = 12;

const player = {
  x: 1,
  y: 1,
  color: "#4b6ff2",
};

const baseChests = [
  { x: 5, y: 2 },
  { x: 10, y: 3 },
  { x: 3, y: 7 },
  { x: 12, y: 6 },
  { x: 7, y: 9 },
];

const obstacles = [
  { x: 4, y: 4 },
  { x: 5, y: 4 },
  { x: 6, y: 4 },
  { x: 9, y: 8 },
  { x: 10, y: 8 },
  { x: 11, y: 8 },
  { x: 2, y: 10 },
  { x: 3, y: 10 },
];

const levels = [
  {
    name: "Level 1 - Conditionals 0",
    key: "zero",
  },
  {
    name: "Level 2 - Conditionals I",
    key: "first",
  },
  {
    name: "Level 3 - Conditionals II",
    key: "second",
  },
  {
    name: "Level 4 - Conditionals III",
    key: "third",
  },
];

const questionBank = {
  zero: [
    {
      type: "mcq",
      text: "Als Yorben water kookt tot 100°C, wat gebeurt er?",
      choices: ["Het water verdampt.", "Het water bevriest.", "Het water wordt zand."],
      answer: "Het water verdampt.",
    },
    {
      type: "tf",
      text: "True/False: Als Sabina ijs verhit, smelt het.",
      answer: true,
    },
    {
      type: "input",
      text: "Vul in: If Emiel ______ (press) the button, the light turns on.",
      answer: ["presses"],
    },
    {
      type: "mcq",
      text: "Wat is een juiste zero conditional voor Ruby?",
      choices: [
        "If Ruby eats sugar, she feels energetic.",
        "If Ruby ate sugar, she would feel energetic.",
        "If Ruby will eat sugar, she feels energetic.",
      ],
      answer: "If Ruby eats sugar, she feels energetic.",
    },
    {
      type: "tf",
      text: "True/False: If Louic mix oil and water, they separate.",
      answer: true,
    },
    {
      type: "input",
      text: "Vul in: If Lina ______ (touch) a hot pan, she burns her hand.",
      answer: ["touches"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct?",
      choices: [
        "If Staf gets hungry, he eats.",
        "If Staf will get hungry, he eats.",
        "If Staf got hungry, he eats.",
      ],
      answer: "If Staf gets hungry, he eats.",
    },
    {
      type: "tf",
      text: "True/False: If Iljano touches ice, it melts immediately.",
      answer: false,
    },
    {
      type: "input",
      text: "Vul in: If Nolan ______ (not sleep), he feels tired.",
      answer: ["doesn't sleep", "does not sleep"],
    },
    {
      type: "mcq",
      text: "Wat past bij zero conditional?",
      choices: [
        "If Milo studies, he passes tests.",
        "If Milo studied, he would pass tests.",
        "If Milo will study, he passes tests.",
      ],
      answer: "If Milo studies, he passes tests.",
    },
  ],
  first: [
    {
      type: "mcq",
      text: "Welke first conditional klopt voor Axel?",
      choices: [
        "If Axel will practice, he improves.",
        "If Axel practices, he will improve.",
        "If Axel practiced, he will improve.",
      ],
      answer: "If Axel practices, he will improve.",
    },
    {
      type: "tf",
      text: "True/False: If Aaron finishes his homework, he will go outside.",
      answer: true,
    },
    {
      type: "input",
      text: "Vul in: If Simon ______ (be) late, he will text Milan.",
      answer: ["is"],
    },
    {
      type: "mcq",
      text: "Kies de juiste zin voor Victor.",
      choices: [
        "If Victor calls, I will answer.",
        "If Victor called, I will answer.",
        "If Victor calls, I answer.",
      ],
      answer: "If Victor calls, I will answer.",
    },
    {
      type: "tf",
      text: "True/False: If Aaron studies tonight, he will probably pass.",
      answer: true,
    },
    {
      type: "input",
      text: "Vul in: If Arno ______ (not hurry), he will miss the bus.",
      answer: ["doesn't hurry", "does not hurry"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij first conditional?",
      choices: [
        "If Ole will win, he gets a medal.",
        "If Ole wins, he will get a medal.",
        "If Ole won, he would get a medal.",
      ],
      answer: "If Ole wins, he will get a medal.",
    },
    {
      type: "tf",
      text: "True/False: If Jules doesn't water the plant, it will die.",
      answer: true,
    },
    {
      type: "input",
      text: "Vul in: If Ethan ______ (call) me, I will help.",
      answer: ["calls"],
    },
    {
      type: "mcq",
      text: "Kies de juiste optie voor Jari.",
      choices: [
        "If Jari finishes early, he will join us.",
        "If Jari finished early, he will join us.",
        "If Jari will finish early, he joins us.",
      ],
      answer: "If Jari finishes early, he will join us.",
    },
  ],
  second: [
    {
      type: "mcq",
      text: "Welke second conditional klopt voor Elise?",
      choices: [
        "If Elise had a bike, she would ride to school.",
        "If Elise has a bike, she would ride to school.",
        "If Elise had a bike, she will ride to school.",
      ],
      answer: "If Elise had a bike, she would ride to school.",
    },
    {
      type: "tf",
      text: "True/False: If Iben were taller, he would play basketball.",
      answer: true,
    },
    {
      type: "input",
      text: "Vul in: If Yluna ______ (have) more time, she would learn guitar.",
      answer: ["had"],
    },
    {
      type: "mcq",
      text: "Kies de juiste zin voor Dylan.",
      choices: [
        "If Dylan lived closer, he would visit more.",
        "If Dylan lives closer, he would visit more.",
        "If Dylan lived closer, he will visit more.",
      ],
      answer: "If Dylan lived closer, he would visit more.",
    },
    {
      type: "tf",
      text: "True/False: If Jaimy had wings, she would fly to class.",
      answer: true,
    },
    {
      type: "input",
      text: "Vul in: If Dylan ______ (be) you, I would apologize.",
      answer: ["were"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Matthias?",
      choices: [
        "If Matthias won the lottery, he would travel.",
        "If Matthias wins the lottery, he would travel.",
        "If Matthias won the lottery, he will travel.",
      ],
      answer: "If Matthias won the lottery, he would travel.",
    },
    {
      type: "tf",
      text: "True/False: If Cashile knew the answer, he would speak up.",
      answer: true,
    },
    {
      type: "input",
      text: "Vul in: If Briek ______ (not be) afraid, he would try.",
      answer: ["weren't", "were not"],
    },
    {
      type: "mcq",
      text: "Kies de juiste optie voor Gilles.",
      choices: [
        "If Gilles had more sleep, he would feel better.",
        "If Gilles has more sleep, he would feel better.",
        "If Gilles had more sleep, he will feel better.",
      ],
      answer: "If Gilles had more sleep, he would feel better.",
    },
  ],
  third: [
    {
      type: "mcq",
      text: "Welke third conditional klopt voor Tristan?",
      choices: [
        "If Tristan had studied, he would have passed.",
        "If Tristan studied, he would have passed.",
        "If Tristan had studied, he will have passed.",
      ],
      answer: "If Tristan had studied, he would have passed.",
    },
    {
      type: "tf",
      text: "True/False: If Nika had left earlier, she would have caught the train.",
      answer: true,
    },
    {
      type: "input",
      text: "Vul in: If Kobe ______ (not forget) his keys, he would have got inside.",
      answer: ["hadn't forgotten", "had not forgotten"],
    },
    {
      type: "mcq",
      text: "Kies de juiste zin voor Brent.",
      choices: [
        "If Brent had listened, he would have understood.",
        "If Brent listened, he would have understood.",
        "If Brent had listened, he would understand.",
      ],
      answer: "If Brent had listened, he would have understood.",
    },
    {
      type: "tf",
      text: "True/False: If Arthur had woken up earlier, he would have missed the bus.",
      answer: false,
    },
    {
      type: "input",
      text: "Vul in: If Niel ______ (train) harder, he would have won.",
      answer: ["had trained"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Manu?",
      choices: [
        "If Manu had known, he would have told Camille.",
        "If Manu knew, he would have told Camille.",
        "If Manu had known, he would tell Camille.",
      ],
      answer: "If Manu had known, he would have told Camille.",
    },
    {
      type: "tf",
      text: "True/False: If Isa had saved the file, she would not have lost her work.",
      answer: true,
    },
    {
      type: "input",
      text: "Vul in: If Leon ______ (not be) so tired, he would have helped Baptist.",
      answer: ["hadn't been", "had not been"],
    },
    {
      type: "mcq",
      text: "Kies de juiste optie voor Dakôta en Remi.",
      choices: [
        "If Dakôta had called Remi, they would have met up.",
        "If Dakôta called Remi, they would have met up.",
        "If Dakôta had called Remi, they would meet up.",
      ],
      answer: "If Dakôta had called Remi, they would have met up.",
    },
  ],
};

let currentLevelIndex = 0;
let score = 0;
let chests = [];
let openedChests = 0;
let activeQuestions = [];
let currentQuestion = null;
let awaitingAnswer = false;
let inMinigame = false;

const keys = new Set();

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setupLevel() {
  const level = levels[currentLevelIndex];
  levelLabel.textContent = level.name;
  player.x = 1;
  player.y = 1;
  openedChests = 0;
  chests = baseChests.map((chest) => ({ ...chest, opened: false }));
  const bank = questionBank[level.key];
  activeQuestions = shuffle(bank).slice(0, 5);
  drawScene();
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawObstacles();
  drawChests();
  drawPlayer();
}

function drawGrid() {
  ctx.fillStyle = "#fdf7fb";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#f3c3de";
  for (let x = 0; x <= gridWidth; x += 1) {
    ctx.beginPath();
    ctx.moveTo(x * tileSize, 0);
    ctx.lineTo(x * tileSize, gridHeight * tileSize);
    ctx.stroke();
  }
  for (let y = 0; y <= gridHeight; y += 1) {
    ctx.beginPath();
    ctx.moveTo(0, y * tileSize);
    ctx.lineTo(gridWidth * tileSize, y * tileSize);
    ctx.stroke();
  }
}

function drawPlayer() {
  const centerX = player.x * tileSize + tileSize / 2;
  const centerY = player.y * tileSize + tileSize / 2;
  ctx.fillStyle = "#f8c9a6";
  ctx.beginPath();
  ctx.arc(centerX, centerY - 12, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#5b3f99";
  ctx.fillRect(centerX - 10, centerY - 6, 20, 16);

  ctx.fillStyle = "#1f8b4c";
  ctx.fillRect(centerX - 12, centerY + 6, 8, 14);
  ctx.fillRect(centerX + 4, centerY + 6, 8, 14);

  ctx.strokeStyle = "#1f8b4c";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(centerX - 12, centerY + 16);
  ctx.lineTo(centerX - 18, centerY + 24);
  ctx.moveTo(centerX + 12, centerY + 16);
  ctx.lineTo(centerX + 18, centerY + 24);
  ctx.stroke();

  ctx.fillStyle = "#7b1d4b";
  ctx.fillRect(centerX - 14, centerY - 4, 6, 10);
  ctx.fillRect(centerX + 8, centerY - 4, 6, 10);
}

function drawChests() {
  chests.forEach((chest) => {
    ctx.fillStyle = chest.opened ? "#f8d9a0" : "#d28d4f";
    ctx.fillRect(
      chest.x * tileSize + 8,
      chest.y * tileSize + 10,
      tileSize - 16,
      tileSize - 20
    );
    ctx.fillStyle = "#7b4b2a";
    ctx.fillRect(
      chest.x * tileSize + 8,
      chest.y * tileSize + 20,
      tileSize - 16,
      6
    );
  });
}

function drawObstacles() {
  obstacles.forEach((rock) => {
    ctx.fillStyle = "#f3a1c8";
    ctx.fillRect(
      rock.x * tileSize + 6,
      rock.y * tileSize + 6,
      tileSize - 12,
      tileSize - 12
    );
  });
}

function isBlocked(x, y) {
  const outside = x < 0 || y < 0 || x >= gridWidth || y >= gridHeight;
  if (outside) return true;
  return obstacles.some((rock) => rock.x === x && rock.y === y);
}

function tryMove(dx, dy) {
  const targetX = player.x + dx;
  const targetY = player.y + dy;
  if (isBlocked(targetX, targetY)) return;
  player.x = targetX;
  player.y = targetY;
  checkChestCollision();
  drawScene();
}

function checkChestCollision() {
  if (awaitingAnswer || inMinigame) return;
  const chest = chests.find(
    (item) => item.x === player.x && item.y === player.y && !item.opened
  );
  if (chest) {
    chest.opened = true;
    openedChests += 1;
    openQuestion();
  }
}

function openQuestion() {
  awaitingAnswer = true;
  currentQuestion = activeQuestions[openedChests - 1];
  questionLevel.textContent = levels[currentLevelIndex].name;
  questionText.textContent = currentQuestion.text;
  questionFeedback.textContent = "";
  nextQuestion.classList.add("hidden");
  questionChoices.innerHTML = "";
  questionInput.classList.add("hidden");
  answerInput.value = "";

  if (currentQuestion.type === "mcq") {
    currentQuestion.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", () => handleAnswer(choice));
      questionChoices.appendChild(button);
    });
  } else if (currentQuestion.type === "tf") {
    [true, false].forEach((value) => {
      const button = document.createElement("button");
      button.textContent = value ? "True" : "False";
      button.addEventListener("click", () => handleAnswer(value));
      questionChoices.appendChild(button);
    });
  } else {
    questionInput.classList.remove("hidden");
  }

  questionScreen.classList.remove("hidden");
}

function normaliseAnswer(value) {
  if (typeof value !== "string") return value;
  return value.trim().toLowerCase();
}

function handleAnswer(value) {
  const correct = currentQuestion.type === "input"
    ? currentQuestion.answer.some(
        (item) => normaliseAnswer(item) === normaliseAnswer(value)
      )
    : currentQuestion.answer === value;

  if (correct) {
    questionFeedback.textContent = "Juist! +10 punten";
    score += 10;
  } else {
    questionFeedback.textContent = `Helaas! Het juiste antwoord is: ${
      Array.isArray(currentQuestion.answer)
        ? currentQuestion.answer[0]
        : currentQuestion.answer
    }`;
  }

  scoreLabel.textContent = `Score: ${score}`;
  nextQuestion.classList.remove("hidden");
  questionChoices.querySelectorAll("button").forEach((btn) => {
    btn.disabled = true;
  });
  submitAnswer.disabled = true;
}

submitAnswer.addEventListener("click", () => {
  if (!currentQuestion || currentQuestion.type !== "input") return;
  handleAnswer(answerInput.value);
});

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleAnswer(answerInput.value);
  }
});

nextQuestion.addEventListener("click", () => {
  questionScreen.classList.add("hidden");
  awaitingAnswer = false;
  submitAnswer.disabled = false;
  if (openedChests >= 5) {
    levelCompleteScreen.classList.remove("hidden");
  }
});

startButton.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  setupLevel();
});

startMinigame.addEventListener("click", () => {
  levelCompleteScreen.classList.add("hidden");
  launchMinigame();
});

continueStory.addEventListener("click", () => {
  minigameScreen.classList.add("hidden");
  continueStory.classList.add("hidden");
  minigameStatus.textContent = "";
  inMinigame = false;
  mini.shotInProgress = false;
  keys.clear();
  if (currentLevelIndex < levels.length - 1) {
    currentLevelIndex += 1;
    setupLevel();
  } else {
    finalScore.textContent = score;
    gameCompleteScreen.classList.remove("hidden");
  }
});

restartGame.addEventListener("click", () => {
  score = 0;
  currentLevelIndex = 0;
  scoreLabel.textContent = "Score: 0";
  gameCompleteScreen.classList.add("hidden");
  setupLevel();
});

function handleKeyDown(event) {
  if (awaitingAnswer) return;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter"].includes(event.key)) {
    event.preventDefault();
  }
  keys.add(event.key);
}

function handleKeyUp(event) {
  keys.delete(event.key);
}

function gameLoop() {
  if (!awaitingAnswer && !inMinigame) {
    if (keys.has("ArrowUp")) {
      keys.delete("ArrowUp");
      tryMove(0, -1);
    } else if (keys.has("ArrowDown")) {
      keys.delete("ArrowDown");
      tryMove(0, 1);
    } else if (keys.has("ArrowLeft")) {
      keys.delete("ArrowLeft");
      tryMove(-1, 0);
    } else if (keys.has("ArrowRight")) {
      keys.delete("ArrowRight");
      tryMove(1, 0);
    }
  }
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

const mini = {
  ballX: 400,
  ballY: 240,
  ballRadius: 14,
  goalX: 200,
  goalWidth: 144,
  goalSpeed: 2.4,
  shotInProgress: false,
  shotSpeed: 6,
  direction: 1,
  completed: false,
};

function launchMinigame() {
  inMinigame = true;
  minigameScreen.classList.remove("hidden");
  mini.ballX = minigameCanvas.width / 2;
  mini.ballY = minigameCanvas.height - 50;
  mini.goalX = 100;
  mini.direction = 1;
  mini.shotInProgress = false;
  mini.completed = false;
  minigameStatus.textContent = "";
  keys.clear();
  minigameCanvas.focus();
  drawMinigame();
}

function drawMinigame() {
  const mctx = minigameCanvas.getContext("2d");
  mctx.clearRect(0, 0, minigameCanvas.width, minigameCanvas.height);
  mctx.fillStyle = "#d7f5ff";
  mctx.fillRect(0, 0, minigameCanvas.width, minigameCanvas.height);

  mctx.fillStyle = "#4bb543";
  mctx.fillRect(0, minigameCanvas.height - 40, minigameCanvas.width, 40);

  mctx.strokeStyle = "#ffffff";
  mctx.lineWidth = 4;
  mctx.strokeRect(mini.goalX, 40, mini.goalWidth, 40);

  mctx.fillStyle = "#ffffff";
  mctx.beginPath();
  mctx.arc(mini.ballX, mini.ballY, mini.ballRadius, 0, Math.PI * 2);
  mctx.fill();
  mctx.strokeStyle = "#f59fcf";
  mctx.stroke();
}

function updateMinigame() {
  if (!inMinigame) {
    requestAnimationFrame(updateMinigame);
    return;
  }
  if (!mini.completed) {
    mini.goalX += mini.goalSpeed * mini.direction;
    if (mini.goalX <= 40 || mini.goalX + mini.goalWidth >= minigameCanvas.width - 40) {
      mini.direction *= -1;
    }

    if (!mini.shotInProgress) {
      if (keys.has("ArrowLeft")) {
        mini.ballX = Math.max(mini.ballRadius, mini.ballX - 6);
      }
      if (keys.has("ArrowRight")) {
        mini.ballX = Math.min(
          minigameCanvas.width - mini.ballRadius,
          mini.ballX + 6
        );
      }
    } else {
      mini.ballY -= mini.shotSpeed;
      if (mini.ballY <= 50) {
        const scored =
          mini.ballX >= mini.goalX &&
          mini.ballX <= mini.goalX + mini.goalWidth;
        minigameStatus.textContent = scored
          ? "Goal! Sterk gemikt!"
          : "Net naast! Volgende level wacht.";
        mini.completed = true;
        continueStory.classList.remove("hidden");
      }
    }
  }
  drawMinigame();
  requestAnimationFrame(updateMinigame);
}

window.addEventListener("keydown", (event) => {
  if (!inMinigame || mini.completed) return;
  if (event.key === "Enter" && !mini.shotInProgress) {
    mini.shotInProgress = true;
  }
});

function startLoops() {
  requestAnimationFrame(gameLoop);
  requestAnimationFrame(updateMinigame);
}

startLoops();
