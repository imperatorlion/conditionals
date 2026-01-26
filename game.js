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
const bonusScreen = document.getElementById("bonus-screen");
const bonusCanvas = document.getElementById("bonus-canvas");
const bonusStatus = document.getElementById("bonus-status");
const startBonus = document.getElementById("start-bonus");
const finishBonus = document.getElementById("finish-bonus");
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

const chestSpawnOptions = [
  { x: 2, y: 2 },
  { x: 4, y: 1 },
  { x: 6, y: 2 },
  { x: 8, y: 3 },
  { x: 11, y: 2 },
  { x: 13, y: 3 },
  { x: 3, y: 5 },
  { x: 6, y: 6 },
  { x: 9, y: 5 },
  { x: 12, y: 5 },
  { x: 2, y: 8 },
  { x: 5, y: 8 },
  { x: 8, y: 9 },
  { x: 11, y: 9 },
  { x: 13, y: 8 },
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
  { x: 7, y: 2 },
  { x: 8, y: 2 },
  { x: 1, y: 6 },
  { x: 2, y: 6 },
  { x: 13, y: 6 },
  { x: 14, y: 6 },
  { x: 6, y: 9 },
  { x: 7, y: 9 },
  { x: 12, y: 10 },
  { x: 13, y: 10 },
  { x: 5, y: 1 },
  { x: 9, y: 1 },
  { x: 15, y: 4 },
  { x: 15, y: 5 },
  { x: 0, y: 8 },
  { x: 1, y: 8 },
  { x: 4, y: 7 },
  { x: 5, y: 7 },
  { x: 9, y: 6 },
  { x: 10, y: 6 },
  { x: 12, y: 2 },
  { x: 12, y: 3 },
  { x: 8, y: 10 },
  { x: 9, y: 10 },
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
    {
      type: "input",
      text: "Vul in: If Sabina ______ (mix) red and blue, she gets purple.",
      answer: ["mixes"],
    },
    {
      type: "mcq",
      text: "Welke zin is een zero conditional over Emiel?",
      choices: [
        "If Emiel heats water, it boils.",
        "If Emiel heated water, it would boil.",
        "If Emiel will heat water, it boils.",
      ],
      answer: "If Emiel heats water, it boils.",
    },
    {
      type: "input",
      text: "Vul in: If Louic ______ (not eat), he feels hungry.",
      answer: ["doesn't eat", "does not eat"],
    },
    {
      type: "mcq",
      text: "Kies de correcte zin voor Lina.",
      choices: [
        "If Lina touches a flame, it burns.",
        "If Lina touched a flame, it burns.",
        "If Lina will touch a flame, it burns.",
      ],
      answer: "If Lina touches a flame, it burns.",
    },
    {
      type: "input",
      text: "Vul in: If Iljano ______ (go) to bed late, he feels sleepy.",
      answer: ["goes"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Nolan?",
      choices: [
        "If Nolan exercises, he feels stronger.",
        "If Nolan exercised, he would feel stronger.",
        "If Nolan will exercise, he feels stronger.",
      ],
      answer: "If Nolan exercises, he feels stronger.",
    },
    {
      type: "input",
      text: "Vul in: If Yorben ______ (eat) too much sugar, he feels restless.",
      answer: ["eats"],
    },
    {
      type: "input",
      text: "Vul in: If Ruby ______ (drink) coffee, she stays awake.",
      answer: ["drinks"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct over Louic?",
      choices: [
        "If Louic forgets his coat, he gets cold.",
        "If Louic forgot his coat, he gets cold.",
        "If Louic will forget his coat, he gets cold.",
      ],
      answer: "If Louic forgets his coat, he gets cold.",
    },
    {
      type: "input",
      text: "Vul in: If Lina ______ (skip) breakfast, she feels hungry.",
      answer: ["skips"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Emiel?",
      choices: [
        "If Emiel presses play, the video starts.",
        "If Emiel pressed play, the video starts.",
        "If Emiel will press play, the video starts.",
      ],
      answer: "If Emiel presses play, the video starts.",
    },
    {
      type: "input",
      text: "Vul in: If Staf ______ (open) the freezer, cold air comes out.",
      answer: ["opens"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct over Milo?",
      choices: [
        "If Milo runs fast, he gets tired.",
        "If Milo ran fast, he gets tired.",
        "If Milo will run fast, he gets tired.",
      ],
      answer: "If Milo runs fast, he gets tired.",
    },
    {
      type: "input",
      text: "Vul in: If Nolan ______ (forget) his keys, he can't enter.",
      answer: ["forgets"],
    },
    {
      type: "input",
      text: "Vul in: If Sabina ______ (touch) snow, it feels cold.",
      answer: ["touches"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Yorben?",
      choices: [
        "If Yorben laughs, he feels better.",
        "If Yorben laughed, he feels better.",
        "If Yorben will laugh, he feels better.",
      ],
      answer: "If Yorben laughs, he feels better.",
    },
    {
      type: "input",
      text: "Vul in: If Ruby ______ (turn) on the lamp, the room gets bright.",
      answer: ["turns"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct over Iljano?",
      choices: [
        "If Iljano studies, he remembers more.",
        "If Iljano studied, he remembers more.",
        "If Iljano will study, he remembers more.",
      ],
      answer: "If Iljano studies, he remembers more.",
    },
    {
      type: "input",
      text: "Vul in: If Louic ______ (not drink) water, he feels thirsty.",
      answer: ["doesn't drink", "does not drink"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Lina?",
      choices: [
        "If Lina walks in rain, she gets wet.",
        "If Lina walked in rain, she gets wet.",
        "If Lina will walk in rain, she gets wet.",
      ],
      answer: "If Lina walks in rain, she gets wet.",
    },
    {
      type: "input",
      text: "Vul in: If Emiel ______ (push) the door, it opens.",
      answer: ["pushes"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Staf?",
      choices: [
        "If Staf cooks pasta, it becomes soft.",
        "If Staf cooked pasta, it becomes soft.",
        "If Staf will cook pasta, it becomes soft.",
      ],
      answer: "If Staf cooks pasta, it becomes soft.",
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
    {
      type: "input",
      text: "Vul in: If Iben ______ (win) the match, he will celebrate.",
      answer: ["wins"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Yluna?",
      choices: [
        "If Yluna practices, she will improve.",
        "If Yluna will practice, she improves.",
        "If Yluna practiced, she will improve.",
      ],
      answer: "If Yluna practices, she will improve.",
    },
    {
      type: "input",
      text: "Vul in: If Jaimy ______ (not ask), he will not know.",
      answer: ["doesn't ask", "does not ask"],
    },
    {
      type: "mcq",
      text: "Kies de juiste zin voor Matthias.",
      choices: [
        "If Matthias gets help, he will finish faster.",
        "If Matthias got help, he will finish faster.",
        "If Matthias will get help, he finishes faster.",
      ],
      answer: "If Matthias gets help, he will finish faster.",
    },
    {
      type: "input",
      text: "Vul in: If Briek ______ (be) late, he will call the teacher.",
      answer: ["is"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Gilles?",
      choices: [
        "If Gilles arrives early, he will save a seat.",
        "If Gilles arrived early, he will save a seat.",
        "If Gilles will arrive early, he saves a seat.",
      ],
      answer: "If Gilles arrives early, he will save a seat.",
    },
    {
      type: "input",
      text: "Vul in: If Axel ______ (train) daily, he will get fitter.",
      answer: ["trains"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Aaron?",
      choices: [
        "If Aaron finishes his homework, he will relax.",
        "If Aaron finished his homework, he will relax.",
        "If Aaron will finish his homework, he relaxes.",
      ],
      answer: "If Aaron finishes his homework, he will relax.",
    },
    {
      type: "input",
      text: "Vul in: If Victor ______ (leave) now, he will catch the bus.",
      answer: ["leaves"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Jules?",
      choices: [
        "If Jules waters the plant, it will grow.",
        "If Jules watered the plant, it will grow.",
        "If Jules will water the plant, it grows.",
      ],
      answer: "If Jules waters the plant, it will grow.",
    },
    {
      type: "input",
      text: "Vul in: If Ethan ______ (forget) his book, he will borrow one.",
      answer: ["forgets"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Jari?",
      choices: [
        "If Jari takes the train, he will arrive on time.",
        "If Jari took the train, he will arrive on time.",
        "If Jari will take the train, he arrives on time.",
      ],
      answer: "If Jari takes the train, he will arrive on time.",
    },
    {
      type: "input",
      text: "Vul in: If Elise ______ (not study), she will feel stressed.",
      answer: ["doesn't study", "does not study"],
    },
    {
      type: "input",
      text: "Vul in: If Dylan ______ (set) an alarm, he will wake up early.",
      answer: ["sets"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Briek?",
      choices: [
        "If Briek hurries, he will be on time.",
        "If Briek hurried, he will be on time.",
        "If Briek will hurry, he is on time.",
      ],
      answer: "If Briek hurries, he will be on time.",
    },
    {
      type: "input",
      text: "Vul in: If Cashile ______ (eat) breakfast, he will feel ready.",
      answer: ["eats"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Simon?",
      choices: [
        "If Simon is late, he will send a message.",
        "If Simon was late, he will send a message.",
        "If Simon will be late, he sends a message.",
      ],
      answer: "If Simon is late, he will send a message.",
    },
    {
      type: "input",
      text: "Vul in: If Victor ______ (call), I will answer.",
      answer: ["calls"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Jaimy?",
      choices: [
        "If Jaimy asks questions, he will learn faster.",
        "If Jaimy asked questions, he will learn faster.",
        "If Jaimy will ask questions, he learns faster.",
      ],
      answer: "If Jaimy asks questions, he will learn faster.",
    },
    {
      type: "input",
      text: "Vul in: If Arno ______ (not study), he will struggle.",
      answer: ["doesn't study", "does not study"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Yluna?",
      choices: [
        "If Yluna practices daily, she will improve quickly.",
        "If Yluna practiced daily, she will improve quickly.",
        "If Yluna will practice daily, she improves quickly.",
      ],
      answer: "If Yluna practices daily, she will improve quickly.",
    },
    {
      type: "input",
      text: "Vul in: If Matthias ______ (focus), he will finish early.",
      answer: ["focuses"],
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
    {
      type: "input",
      text: "Vul in: If Nika ______ (be) less busy, she would join the club.",
      answer: ["were"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Kobe?",
      choices: [
        "If Kobe had a skateboard, he would skate to school.",
        "If Kobe has a skateboard, he would skate to school.",
        "If Kobe had a skateboard, he will skate to school.",
      ],
      answer: "If Kobe had a skateboard, he would skate to school.",
    },
    {
      type: "input",
      text: "Vul in: If Arthur ______ (have) more money, he would buy new shoes.",
      answer: ["had"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Niel?",
      choices: [
        "If Niel spoke Spanish, he would travel more.",
        "If Niel speaks Spanish, he would travel more.",
        "If Niel spoke Spanish, he will travel more.",
      ],
      answer: "If Niel spoke Spanish, he would travel more.",
    },
    {
      type: "input",
      text: "Vul in: If Isa ______ (be) a bird, she would fly.",
      answer: ["were"],
    },
    {
      type: "mcq",
      text: "Kies de juiste optie voor Leon.",
      choices: [
        "If Leon owned a dog, he would walk it daily.",
        "If Leon owns a dog, he would walk it daily.",
        "If Leon owned a dog, he will walk it daily.",
      ],
      answer: "If Leon owned a dog, he would walk it daily.",
    },
    {
      type: "input",
      text: "Vul in: If Elise ______ (live) near the school, she would walk.",
      answer: ["lived"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Iben?",
      choices: [
        "If Iben were taller, he would play volleyball.",
        "If Iben is taller, he would play volleyball.",
        "If Iben were taller, he will play volleyball.",
      ],
      answer: "If Iben were taller, he would play volleyball.",
    },
    {
      type: "input",
      text: "Vul in: If Yluna ______ (know) the answer, she would help.",
      answer: ["knew"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Dylan?",
      choices: [
        "If Dylan had more time, he would read more.",
        "If Dylan has more time, he would read more.",
        "If Dylan had more time, he will read more.",
      ],
      answer: "If Dylan had more time, he would read more.",
    },
    {
      type: "input",
      text: "Vul in: If Jaimy ______ (have) a car, he would drive to school.",
      answer: ["had"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Briek?",
      choices: [
        "If Briek spoke louder, people would hear him.",
        "If Briek speaks louder, people would hear him.",
        "If Briek spoke louder, people will hear him.",
      ],
      answer: "If Briek spoke louder, people would hear him.",
    },
    {
      type: "input",
      text: "Vul in: If Matthias ______ (be) more careful, he would avoid errors.",
      answer: ["were"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Cashile?",
      choices: [
        "If Cashile slept earlier, he would feel better.",
        "If Cashile sleeps earlier, he would feel better.",
        "If Cashile slept earlier, he will feel better.",
      ],
      answer: "If Cashile slept earlier, he would feel better.",
    },
    {
      type: "input",
      text: "Vul in: If Niel ______ (have) a bike, he would ride more.",
      answer: ["had"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Manu?",
      choices: [
        "If Manu had a tutor, he would learn faster.",
        "If Manu has a tutor, he would learn faster.",
        "If Manu had a tutor, he will learn faster.",
      ],
      answer: "If Manu had a tutor, he would learn faster.",
    },
    {
      type: "input",
      text: "Vul in: If Isa ______ (live) in a city, she would take the metro.",
      answer: ["lived"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Leon?",
      choices: [
        "If Leon knew the route, he would guide us.",
        "If Leon knows the route, he would guide us.",
        "If Leon knew the route, he will guide us.",
      ],
      answer: "If Leon knew the route, he would guide us.",
    },
    {
      type: "input",
      text: "Vul in: If Kobe ______ (be) faster, he would win the race.",
      answer: ["were"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Brent?",
      choices: [
        "If Brent had more patience, he would finish calmly.",
        "If Brent has more patience, he would finish calmly.",
        "If Brent had more patience, he will finish calmly.",
      ],
      answer: "If Brent had more patience, he would finish calmly.",
    },
    {
      type: "input",
      text: "Vul in: If Arthur ______ (speak) Dutch, he would feel confident.",
      answer: ["spoke"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Nika?",
      choices: [
        "If Nika had more time, she would join the team.",
        "If Nika has more time, she would join the team.",
        "If Nika had more time, she will join the team.",
      ],
      answer: "If Nika had more time, she would join the team.",
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
    {
      type: "input",
      text: "Vul in: If Sabina ______ (not miss) the bus, she would have arrived on time.",
      answer: ["hadn't missed", "had not missed"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Emiel?",
      choices: [
        "If Emiel had practiced, he would have played better.",
        "If Emiel practiced, he would have played better.",
        "If Emiel had practiced, he would play better.",
      ],
      answer: "If Emiel had practiced, he would have played better.",
    },
    {
      type: "input",
      text: "Vul in: If Louic ______ (not forget) his password, he would have logged in.",
      answer: ["hadn't forgotten", "had not forgotten"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Lina?",
      choices: [
        "If Lina had studied, she would have passed.",
        "If Lina studied, she would have passed.",
        "If Lina had studied, she would pass.",
      ],
      answer: "If Lina had studied, she would have passed.",
    },
    {
      type: "input",
      text: "Vul in: If Iljano ______ (not be) so tired, he would have finished the task.",
      answer: ["hadn't been", "had not been"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Nolan?",
      choices: [
        "If Nolan had called earlier, he would have reached Milo.",
        "If Nolan called earlier, he would have reached Milo.",
        "If Nolan had called earlier, he would reach Milo.",
      ],
      answer: "If Nolan had called earlier, he would have reached Milo.",
    },
    {
      type: "input",
      text: "Vul in: If Tristan ______ (study) harder, he would have passed.",
      answer: ["had studied"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Nika?",
      choices: [
        "If Nika had left earlier, she would have caught the train.",
        "If Nika left earlier, she would have caught the train.",
        "If Nika had left earlier, she would catch the train.",
      ],
      answer: "If Nika had left earlier, she would have caught the train.",
    },
    {
      type: "input",
      text: "Vul in: If Brent ______ (listen) carefully, he would have understood.",
      answer: ["had listened"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Arthur?",
      choices: [
        "If Arthur had set an alarm, he would have woken up.",
        "If Arthur set an alarm, he would have woken up.",
        "If Arthur had set an alarm, he would wake up.",
      ],
      answer: "If Arthur had set an alarm, he would have woken up.",
    },
    {
      type: "input",
      text: "Vul in: If Isa ______ (save) the file, she would have kept her work.",
      answer: ["had saved"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Sabina?",
      choices: [
        "If Sabina had checked the schedule, she would have arrived on time.",
        "If Sabina checked the schedule, she would have arrived on time.",
        "If Sabina had checked the schedule, she would arrive on time.",
      ],
      answer: "If Sabina had checked the schedule, she would have arrived on time.",
    },
    {
      type: "input",
      text: "Vul in: If Emiel ______ (practice) more, he would have improved.",
      answer: ["had practiced"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Ruby?",
      choices: [
        "If Ruby had left earlier, she would have caught the bus.",
        "If Ruby left earlier, she would have caught the bus.",
        "If Ruby had left earlier, she would catch the bus.",
      ],
      answer: "If Ruby had left earlier, she would have caught the bus.",
    },
    {
      type: "input",
      text: "Vul in: If Louic ______ (remember) his password, he would have logged in.",
      answer: ["had remembered"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Lina?",
      choices: [
        "If Lina had studied, she would have passed.",
        "If Lina studied, she would have passed.",
        "If Lina had studied, she would pass.",
      ],
      answer: "If Lina had studied, she would have passed.",
    },
    {
      type: "input",
      text: "Vul in: If Staf ______ (train) more, he would have felt stronger.",
      answer: ["had trained"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Iljano?",
      choices: [
        "If Iljano had slept earlier, he would have finished the task.",
        "If Iljano slept earlier, he would have finished the task.",
        "If Iljano had slept earlier, he would finish the task.",
      ],
      answer: "If Iljano had slept earlier, he would have finished the task.",
    },
    {
      type: "input",
      text: "Vul in: If Nolan ______ (call) earlier, he would have reached Milo.",
      answer: ["had called"],
    },
    {
      type: "mcq",
      text: "Welke zin is correct voor Dakôta en Remi?",
      choices: [
        "If Dakôta had called Remi, they would have met up.",
        "If Dakôta called Remi, they would have met up.",
        "If Dakôta had called Remi, they would meet up.",
      ],
      answer: "If Dakôta had called Remi, they would have met up.",
    },
    {
      type: "input",
      text: "Vul in: If Yorben ______ (save) the document, he would not have lost it.",
      answer: ["had saved"],
    },
    {
      type: "mcq",
      text: "Welke zin past bij Manu en Camille?",
      choices: [
        "If Manu had known, he would have told Camille.",
        "If Manu knew, he would have told Camille.",
        "If Manu had known, he would tell Camille.",
      ],
      answer: "If Manu had known, he would have told Camille.",
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
let inBonus = false;

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
  chests = shuffle(chestSpawnOptions)
    .filter((chest) => !isBlocked(chest.x, chest.y))
    .slice(0, 5)
    .map((chest) => ({ ...chest, opened: false }));
  const bank = questionBank[level.key].filter((question) => question.type !== "tf");
  const inputQuestions = shuffle(bank.filter((question) => question.type === "input"));
  const otherQuestions = shuffle(bank.filter((question) => question.type !== "input"));
  activeQuestions = [
    ...inputQuestions.slice(0, 3),
    ...otherQuestions.slice(0, 2),
  ];
  activeQuestions = shuffle(activeQuestions).slice(0, 5);
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
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#000000";

  ctx.fillStyle = "#f8c9a6";
  ctx.beginPath();
  ctx.arc(centerX, centerY - 12, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#5b3f99";
  ctx.fillRect(centerX - 10, centerY - 6, 20, 16);
  ctx.strokeRect(centerX - 10, centerY - 6, 20, 16);

  ctx.fillStyle = "#1f8b4c";
  ctx.fillRect(centerX - 12, centerY + 6, 8, 14);
  ctx.fillRect(centerX + 4, centerY + 6, 8, 14);
  ctx.strokeRect(centerX - 12, centerY + 6, 8, 14);
  ctx.strokeRect(centerX + 4, centerY + 6, 8, 14);

  ctx.strokeStyle = "#1f8b4c";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(centerX - 12, centerY + 16);
  ctx.lineTo(centerX - 18, centerY + 24);
  ctx.moveTo(centerX + 12, centerY + 16);
  ctx.lineTo(centerX + 18, centerY + 24);
  ctx.stroke();

  ctx.fillStyle = "#7b1d4b";
  ctx.fillRect(centerX - 14, centerY - 4, 6, 10);
  ctx.fillRect(centerX + 8, centerY - 4, 6, 10);
  ctx.strokeRect(centerX - 14, centerY - 4, 6, 10);
  ctx.strokeRect(centerX + 8, centerY - 4, 6, 10);
  ctx.restore();
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
    launchBonusScreen();
  }
});

restartGame.addEventListener("click", () => {
  score = 0;
  currentLevelIndex = 0;
  scoreLabel.textContent = "Score: 0";
  gameCompleteScreen.classList.add("hidden");
  bonusScreen.classList.add("hidden");
  inBonus = false;
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
  if (!awaitingAnswer && !inMinigame && !inBonus) {
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
  goalWidth: 88,
  goalSpeed: 3.45,
  shotInProgress: false,
  shotSpeed: 6,
  direction: 1,
  completed: false,
};

const bonus = {
  racketX: 320,
  racketY: 240,
  racketWidth: 140,
  racketHeight: 14,
  ballX: 120,
  ballY: -20,
  ballRadius: 10,
  ballSpeedY: 3,
  ballSpeedX: 1,
  caught: 0,
  target: 5,
  active: false,
  finished: false,
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

function launchBonusScreen() {
  inBonus = true;
  bonusScreen.classList.remove("hidden");
  bonus.caught = 0;
  bonus.active = false;
  bonus.finished = false;
  bonus.racketX = bonusCanvas.width / 2 - bonus.racketWidth / 2;
  bonus.racketY = bonusCanvas.height - 40;
  resetBonusBall();
  bonusStatus.textContent = "Klaar voor de ultieme beloning?";
  startBonus.classList.remove("hidden");
  finishBonus.classList.add("hidden");
  keys.clear();
  bonusCanvas.focus();
  drawBonusGame();
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
        const nextStepText =
          currentLevelIndex < levels.length - 1
            ? "Net naast! Volgende level wacht."
            : "Net naast! De bonusgame wacht.";
        minigameStatus.textContent = scored ? "Goal! Sterk gemikt!" : nextStepText;
        mini.completed = true;
        continueStory.textContent =
          currentLevelIndex < levels.length - 1
            ? "Verder naar het volgende level"
            : "Ontgrendel de bonusgame";
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

startBonus.addEventListener("click", () => {
  bonus.active = true;
  bonusStatus.textContent = `Vang ${bonus.target} ballen!`;
  startBonus.classList.add("hidden");
  bonusCanvas.focus();
});

finishBonus.addEventListener("click", () => {
  bonusScreen.classList.add("hidden");
  inBonus = false;
  finalScore.textContent = score;
  gameCompleteScreen.classList.remove("hidden");
});

function resetBonusBall() {
  bonus.ballX = 40 + Math.random() * (bonusCanvas.width - 80);
  bonus.ballY = -20;
  bonus.ballSpeedY = 3 + Math.random() * 2;
  bonus.ballSpeedX = (Math.random() * 2 - 1) * 1.5;
}

function drawBonusGame() {
  const bctx = bonusCanvas.getContext("2d");
  bctx.clearRect(0, 0, bonusCanvas.width, bonusCanvas.height);
  bctx.fillStyle = "#e6f7ff";
  bctx.fillRect(0, 0, bonusCanvas.width, bonusCanvas.height);

  bctx.fillStyle = "#cde47b";
  bctx.fillRect(0, bonusCanvas.height - 50, bonusCanvas.width, 50);

  bctx.strokeStyle = "#ffffff";
  bctx.lineWidth = 3;
  bctx.beginPath();
  bctx.moveTo(0, bonusCanvas.height - 50);
  bctx.lineTo(bonusCanvas.width, bonusCanvas.height - 50);
  bctx.stroke();

  bctx.fillStyle = "#f4b860";
  bctx.fillRect(
    bonus.racketX,
    bonus.racketY,
    bonus.racketWidth,
    bonus.racketHeight
  );
  bctx.strokeStyle = "#7b4b2a";
  bctx.lineWidth = 2;
  bctx.strokeRect(
    bonus.racketX,
    bonus.racketY,
    bonus.racketWidth,
    bonus.racketHeight
  );

  bctx.fillStyle = "#ffeb5a";
  bctx.beginPath();
  bctx.arc(bonus.ballX, bonus.ballY, bonus.ballRadius, 0, Math.PI * 2);
  bctx.fill();
  bctx.strokeStyle = "#f59fcf";
  bctx.stroke();
}

function updateBonusGame() {
  if (!inBonus) {
    requestAnimationFrame(updateBonusGame);
    return;
  }

  if (bonus.active && !bonus.finished) {
    if (keys.has("ArrowLeft")) {
      bonus.racketX = Math.max(0, bonus.racketX - 8);
    }
    if (keys.has("ArrowRight")) {
      bonus.racketX = Math.min(
        bonusCanvas.width - bonus.racketWidth,
        bonus.racketX + 8
      );
    }

    bonus.ballX += bonus.ballSpeedX;
    bonus.ballY += bonus.ballSpeedY;

    if (bonus.ballX <= bonus.ballRadius || bonus.ballX >= bonusCanvas.width - bonus.ballRadius) {
      bonus.ballSpeedX *= -1;
    }

    const hitRacket =
      bonus.ballY + bonus.ballRadius >= bonus.racketY &&
      bonus.ballY - bonus.ballRadius <= bonus.racketY + bonus.racketHeight &&
      bonus.ballX >= bonus.racketX &&
      bonus.ballX <= bonus.racketX + bonus.racketWidth;

    if (hitRacket) {
      bonus.caught += 1;
      if (bonus.caught >= bonus.target) {
        bonus.finished = true;
        bonus.active = false;
        bonusStatus.textContent = "Perfect! Je hebt alle ballen gevangen.";
        finishBonus.classList.remove("hidden");
      } else {
        bonusStatus.textContent = `Gevangen: ${bonus.caught}/${bonus.target}`;
        resetBonusBall();
      }
    } else if (bonus.ballY > bonusCanvas.height + 20) {
      resetBonusBall();
    }
  }

  drawBonusGame();
  requestAnimationFrame(updateBonusGame);
}

function startLoops() {
  requestAnimationFrame(gameLoop);
  requestAnimationFrame(updateMinigame);
  requestAnimationFrame(updateBonusGame);
}

startLoops();
