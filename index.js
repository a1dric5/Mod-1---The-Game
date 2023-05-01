//array of strings containing the words that the player needs to find in the game.
const wordsToFind = [
    "red", 
    "blue", 
    "green"
];

const displayWordList = () => {
  // select containing div
  const wordsDiv = document.querySelector("wordsToFind"); 
// loop through wordstofind
for (let i = 0; i < wordsToFind.length; i++) {
  const word = wordsToFind[i];

// add each word to the innerHTML of containing div
const wordDiv = document.createElement('div'); 
wordDiv.textContent = word;

// append the word div to the containing div 
wordsDiv.appendChild(wordDiv); 
  }
};

// select the 'wordsToFind' div element
const wordsToFindDiv = document.querySelector('.wordsToFind');

// create a new heading element for the words to find and set its text content
const wordsToFindHeading = document.createElement('h2');
wordsToFindHeading.textContent = 'Words to Find:';

// create an unordered list element to hold the words
const wordsList = document.createElement('ul');

// create a list item element for each word and add it to the unordered list
const redWordItem = document.createElement('li');
redWordItem.textContent = 'Red';
wordsList.appendChild(redWordItem);

const blueWordItem = document.createElement('li');
blueWordItem.textContent = 'Blue';
wordsList.appendChild(blueWordItem);

const greenWordItem = document.createElement('li');
greenWordItem.textContent = 'Green';
wordsList.appendChild(greenWordItem);

// append the heading and unordered list to the 'wordsToFind' div
wordsToFindDiv.appendChild(wordsToFindHeading);
wordsToFindDiv.appendChild(wordsList);

// variables used to keep track of the state of the game
let currentWordIndex = 0;
let wordsFound = 0;
let timeRemaining = 5;

// an array that contains all the letters of the alphabet, in order.
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// These lines of code retrieve references to specific elements in the HTML document. 
const gameboard = document.getElementById("game-board");
const timeRemainingDisplay = document.getElementById("time-remaining");
const resetButton = document.getElementById("reset-button");
const message = document.querySelector("h1");

//defines a function called returnRandomLetter() that returns a random letter from the alphabet array.
const returnRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * 26);
    return alphabet[randomIndex];
};

console.log(returnRandomLetter);

// initializes the game board and sets up the words to be found in the game.
const putWordOnBoard = () => {
  for (let i = 0; i < 100; i++) {
    if (i == 3 || i == 13 || i == 43) {
        let letterArray = wordsToFind[currentWordIndex].split("")
        letterArray.forEach((letter)=>{
            gameboard.innerHTML += `<div data-index="${currentWordIndex}">${letter}</div>`
        }) 
        i += letterArray.length
        currentWordIndex++
    }
    gameboard.innerHTML += `<div>${returnRandomLetter()}</div>`
 };
};



//responsible for checking if a word has been found on the game board.
// const checkIfWordIsFound = () => {
//     const letters = document.querySelectorAll("#game-board > div");
//     const word = wordsToFind[wordsFound];
//     const found = Array.from(letters)
//       .slice(10 * wordsFound, 10 * (wordsFound + 1))
//       .reduce((acc, curr) => acc + curr.textContent, "") === word;
//     if (found) {
//       console.log(found);
//       wordsFound++;
//       console.log(wordsFound);
//       message.textContent = `You found ${word}!`;
//       if (wordsFound === wordsToFind.length) {
//         message.textContent = "Congratulations, you found all the words!";
//         clearInterval(timerInterval);
//       }
//     }
//   };
  
  // checkIfWordIsFound(); 
  
  //adds the CSS class highlighted to the letterDiv, which visually highlights the letter on the game board.
  const highlightLetter = (letterDiv) => {
    letterDiv.classList.add("highlighted");
    checkIfWordIsFound();
  };


  
  //removes the "highlighted" class from a letter div element that was previously highlighted.
  const unhighlightLetter = (letterDiv) => {
    letterDiv.classList.remove("highlighted");
  };


// attaches event listeners to each letter element in the game board
  document.querySelectorAll("#game-board > div").forEach((letterDiv) => {
    letterDiv.addEventListener("click", () => {
      const currentWord = wordsToFind[wordsFound];
      console.log(currentWord);
      console.log(letterDiv);
      const currentLetter = currentWord.charAt(0);
      console.log(currentLetter);
      if (letterDiv.textContent === currentLetter) {
        highlightLetter(letterDiv);
        currentWordIndex++;
        if (currentWord.length > 1) {
          wordsToFind[wordsFound] = currentWord.slice(1);
        } else {
          wordsToFind.splice(wordsFound, 1);
        }
        putWordOnBoard();
      }
    });
    letterDiv.addEventListener("mouseover", () => {
      if (letterDiv.textContent === wordsToFind[wordsFound].charAt(0)) {
        highlightLetter(letterDiv);
      }
    });
    letterDiv.addEventListener("mouseout", () => {
      if (letterDiv.classList.contains("highlighted")) {
        unhighlightLetter(letterDiv);
      }
    });
  });
  

/*sets up an interval that decrements the timeRemaining variable by 1 every second, updates the timeRemainingDisplay element 
to show the remaining time, and stops the timer and displays a "Time's up!" message once the timeRemaining reaches 0.*/

const checkGameStatus = () => {
  if (wordsFound === wordsToFind.length) {
    message.innerHTML = `You Win!`;
  } 
  if (timeRemaining === 0 && wordsFound < wordsToFind.length) {
    message.innerHTML = `You Lose!`;
    console.log(wordsFound);
  }

  let highlightedWords = document.querySelectorAll(".highlighted")
  console.log(highlightedWords.length)
};

const timerInterval = setInterval(() => {
    timeRemaining--;
    timeRemainingDisplay.textContent = timeRemaining;
    if (timeRemaining === 0) {
        clearInterval(timerInterval);
        message.textContent = "Time's up!";
    }
}, 1000);

putWordOnBoard();


// gameboard.addEventListener("click", checkIfWordIsFound);

/*The gameboard element listens for clicks and checks if the clicked letters form one of the words to find. The resetButton element 
resets the game and generates a new game board. The timer counts down from 60 seconds and stops when time is up or all words are found.*/
resetButton.addEventListener("click", () => {
    currentWordIndex = 0;
    wordsFound = 0;
    timeRemaining = 5;
    gameboard.innerHTML = "";
    putWordOnBoard();
    timeRemainingDisplay.textContent = timeRemaining;
    message.textContent = "";
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeRemaining--;
        timeRemainingDisplay.textContent = timeRemaining;
        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            message.textContent = "Time's up!";
        }
    }, 1000);
    foundCorrectWords();
});


// sets up an event listener for each letter in each word to be found in a word search game.
  const foundCorrectWords = () => {

    for (let i = 0; i < wordsToFind.length; i++) {
      let lettersOfWordArray = document.querySelectorAll(`[data-index="${i}"]`)
      console.log(lettersOfWordArray);
      for (let j = 0; j < lettersOfWordArray.length; j++) {
      lettersOfWordArray[j].addEventListener("click", () => {
        lettersOfWordArray.forEach((letterElement) => {
          letterElement.classList.add("highlighted")
          // message.textContent = `You found ${lettersOfWordArray}!`;
        })
        wordsFound++;
          console.log(wordsFound);
          checkGameStatus();
      }) 
      }
    }
  };
  foundCorrectWords();

//     const checkGameStatus = () => {
//       if (wordsFound === wordsToFind.length) {
//         message.innerHTML = `You Win!`;
//       } 
//       if (timeRemaining === 0 && wordsFound < wordsToFind.length) {
//         message.innerHTML = `You Lose!`;
//         console.log(wordsFound);
//       }

//       let highlightedWords = document.querySelectorAll(".highlighted")
//       console.log(highlightedWords.length)
//     };

// checkGameStatus();

// const checkIfWordIsFound = () => {
//   const letters = document.querySelectorAll("#game-board > div");
//   const word = wordsToFind[wordsFound];
//   const found = Array.from(letters)
//     .slice(10 * wordsFound, 10 * (wordsFound + 1))
//     .reduce((acc, curr) => acc + curr.textContent, "") === word;
//   if (found) {
//     console.log(found);
//     wordsFound++;
//     console.log(wordsFound);
//     message.textContent = `You found ${word}!`;
//     if (wordsFound === wordsToFind.length) {
//       message.textContent = "Congratulations, you found all the words!";
//       clearInterval(timerInterval);
//     }
//   }
// };
