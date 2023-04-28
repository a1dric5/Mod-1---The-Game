// Define your word list here
const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
  "mango",
  "nectarine",
  "orange",
  "pear",
  "quince",
  "raspberry",
  "strawberry",
  "tangerine",
  "watermelon",
  "dragonfruit"
];

// Define your game settings here
const rows = 10; // number of rows in the word search grid
const cols = 10; // number of columns in the word search grid
const timeLimit = 120; // time limit for the game in seconds

// Get DOM elements
const gameBoard = document.querySelector(".game-board");
const timeRemaining = document.querySelector("#time-remaining");
const resetButton = document.querySelector("#reset-button");
const message = document.querySelector(".message");

// Define game state variables
let gameStarted = false;
let timerId = null;
let secondsRemaining = timeLimit;
let wordsFound = 0;

const generateGrid = (rows, cols) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65); // generate a random uppercase letter
      row.push(letter);
    }
    grid.push(row);
  }
  return grid;
}


const insertWords = (grid, words) => {
  for (let word of words) {
    let placed = false;
    while (!placed) {
      const direction = Math.floor(Math.random() * 8);
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (canPlaceWord(grid, word, direction, row, col)) {
        placeWord(grid, word, direction, row, col);
        placed = true;
      }
    }
  }
}


const canPlaceWord = (grid, word, direction, row, col) => {
  const wordLength = word.length;
  const endRow = row + (wordLength - 1) * DIRECTION_DELTAS[direction][0];
  const endCol = col + (wordLength - 1) * DIRECTION_DELTAS[direction][1];
  if (endRow < 0 || endRow >= rows || endCol < 0 || endCol >= cols) {
  return false;
  }
  for (let i = 0; i < wordLength; i++) {
  const letter = word[i];
  const curRow = row + i * DIRECTION_DELTAS[direction][0];
  const curCol = col + i * DIRECTION_DELTAS[direction][1];
  if (grid[curRow][curCol] !== letter && grid[curRow][curCol] !== " ") {
  return false;
       }
    }
  return true;
  };

  const placeWord = (grid, word, direction, row, col) => {
    const wordLength = word.length;
    for (let i = 0; i < wordLength; i++) {
      const letter = word[i];
      const curRow = row + i * DIRECTION_DELTAS[direction][0];
      const curCol = col + i * DIRECTION_DELTAS[direction][1];
      grid[curRow][curCol] = letter;
    }
  };
  

  const renderGrid = (grid) => {
    gameBoard.innerHTML = "";
    for (let i = 0; i < rows; i++) {
      const rowEl = document.createElement("div");
      rowEl.classList.add("row");
      for (let j = 0; j < cols; j++) {
        const letter = grid[i][j];
        const cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.innerText = letter;
        rowEl.appendChild(cellEl);
      }
      gameBoard.appendChild(rowEl);
    }
  };
  
  const updateTimer = () => {
    secondsRemaining--;
    timeRemaining.innerText = secondsRemaining;
    if (secondsRemaining === 0) {
    endGame(false);
    }
 };
  
 const startGame = () => {
  gameStarted = true;
  resetButton.disabled = true;
  message.innerText = "";
  grid = generateGrid(rows, cols);
  insertWords(grid, words);
  renderGrid(grid);
  timerId = setInterval(updateTimer, 1000);
  };
  
  const endGame = (won) => {
    gameStarted = false;
    clearInterval(timerId);
    resetButton.disabled = false;
    if (won) {
      message.innerText = "Congratulations, you won!";
    } else {
      message.innerText = "Time's up! Game over.";
    }
  };
  
  
// Define event listeners
resetButton.addEventListener("click", startGame);

gameBoard.addEventListener("mousedown", function(e) {
  if (!gameStarted) {
    return;
  }
  const cell = e.target;
  if (cell.tagName !== "DIV" || cell.classList.contains("selected")) {
    return;
  }
  const row = cell.parentNode.classList[1];
  const col = Array.from(cell.parentNode.children).indexOf(cell);
  const word = findWord(grid, row, col);
  if (word) {
    markWord(word);
    wordsFound++;
    if (wordsFound === words.length) {
      endGame(true);
    }
  }
});

  
  // Start the game
  startGame();

  // Define helper function to check if a string is a prefix of any word in the dictionary
  const isPrefix = (word) => {
    for (const dictWord of dictionary) {
      if (dictWord.startsWith(word)) {
        return true;
      }
    }
    return false;
  };
  

// Define helper function to check if a string is a word in the dictionary        // FIX THIS 
const isWord = word => dictionary.includes(word);


// Define function to update the timer
const updatedTimer = () => {
  timeRemaining--;
  document.getElementById("time-remaining").innerText = timeRemaining;
  if (timeRemaining === 0) {
    endGame();
  }
};


// Define function to end the game when time is up or all words are found
const endTheGame = () => {
  clearInterval(timerId);
  gameBoard.removeEventListener("mousedown", handleCellClick);
  messageEl.innerText = `Game over! You found ${wordsFound.length} out of ${words.length} words.`;
};


// Define function to reset the game
const resetGame = () => {
  clearInterval(timerId);
  timeRemaining = totalTime;
  wordsFound = [];
  gameBoard.innerHTML = "";
  messageEl.innerText = "";
  setupGame();
};

// Define function to set up the game board
const setupGame = () => {
// Create grid
  const grid = createGrid(rows, cols);
// Fill grid with random letters
  fillGrid(grid, letters);
// Hide some letters to create word search puzzle
  hideLetters(grid, words);
// Render grid
  renderGrid(grid);
// Set up timer
  timerId = setInterval(updateTimer, 1000);
// Set up reset button
  resetButton.addEventListener("click", resetGame);
// Set up click event listener for cells
  gameBoard.addEventListener("mousedown", handleCellClick);
  };


  const handleCellClick = (event) => {
    if (event.target.classList.contains("cell")) {
      const cell = event.target;
      const row = cell.parentNode.classList[1];
      const col = Array.from(cell.parentNode.children).indexOf(cell);
      const word = findWord(grid, row, col);
      if (word && !wordsFound.includes(word)) {
        wordsFound.push(word);
        markWord(word);
        messageEl.innerText = `Found word: ${word}`;
        if (wordsFound.length === words.length) {
          endGame();
        }
      }
    }
  };
  

// Set up game on load
setupGame();

