//array of strings containing the words that the player needs to find in the game.
const wordsToFind = [
    "red", 
    "blue", 
    "green"
];

const displayWordList = () => {
  // select containing div
// loop through wordstofind
// add each word to the innerHTML of containging div
}
// variables used to keep track of the state of the game
let currentWordIndex = 0;
let wordsFound = 0;
let timeRemaining = 60;

// an array that contains all the letters of the alphabet, in order.
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// These lines of code retrieve references to specific elements in the HTML document. 
const gameboard = document.getElementById("game-board");
const timeRemainingDisplay = document.getElementById("time-remaining");
const resetButton = document.getElementById("reset-button");
const message = document.getElementById("message");

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
const checkIfWordIsFound = () => {
    const letters = document.querySelectorAll("#game-board > div");
    const word = wordsToFind[wordsFound];
    const found = Array.from(letters)
      .slice(10 * wordsFound, 10 * (wordsFound + 1))
      .reduce((acc, curr) => acc + curr.textContent, "") === word;
    if (found) {
      wordsFound++;
      message.textContent = `You found ${word}!`;
      if (wordsFound === wordsToFind.length) {
        message.textContent = "Congratulations, you found all the words!";
        clearInterval(timerInterval);
      }
    }
  };

  console.log(checkIfWordIsFound); 
  
  //adds the CSS class highlighted to the letterDiv, which visually highlights the letter on the game board.
  const highlightLetter = (letterDiv) => {
    letterDiv.classList.add("highlighted");
    checkIfWordIsFound();
  };
  
  console.log(highlightLetter)
  //removes the "highlighted" class from a letter div element that was previously highlighted.
  const unhighlightLetter = (letterDiv) => {
    letterDiv.classList.remove("highlighted");
  };
  console.log(unhighlightLetter)

  document.querySelectorAll("#game-board > div").forEach((letterDiv) => {
    letterDiv.addEventListener("click", () => {
      const currentWord = wordsToFind[wordsFound];
      const currentLetter = currentWord.charAt(0);
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
const timerInterval = setInterval(() => {
    timeRemaining--;
    timeRemainingDisplay.textContent = timeRemaining;
    if (timeRemaining === 0) {
        clearInterval(timerInterval);
        message.textContent = "Time's up!";
    }
}, 1000);

console.log(timerInterval)
putWordOnBoard()


gameboard.addEventListener("click", checkIfWordIsFound);

/*The gameboard element listens for clicks and checks if the clicked letters form one of the words to find. The resetButton element 
resets the game and generates a new game board. The timer counts down from 60 seconds and stops when time is up or all words are found.*/
resetButton.addEventListener("click", () => {
    currentWordIndex = 0;
    wordsFound = 0;
    timeRemaining = 60;
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
});

for (let i = 0; i < wordsToFind.length; i++) {
  let lettersOfWordArray = document.querySelectorAll(`[data-index="${i}"]`)
  console.log(lettersOfWordArray);
  for (let j = 0; j < lettersOfWordArray.length; j++) {
  lettersOfWordArray[j].addEventListener("click", () => {
    lettersOfWordArray.forEach((letterElement) => {
      letterElement.classList.add("highlighted")
    })
  }) 
  }
};



// debugger



// const wordsToFind = [
//     "red", 
//     "blue", 
//     "green"]
// let indexOfCurrentWord = 0

// const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

// let gameboard = document.getElementById("game-board")

// const returnRandomLetter = () => {
//     const randomindex = Math.floor(Math.random() * 26) 
//     console.log(randomindex)
//     return alphabet[randomindex]
// }

// const putWordOnBoard = () => {

// }
// putWordOnBoard()
// for (let i = 0; i < 100; i++) {
//     if (i == 3 || i == 13 || i == 43) {
//         let letterArray = wordsToFind[indexOfCurrentWord].split("")
//         letterArray.forEach((letter)=>{
//             gameboard.innerHTML += `<div>${letter}</div>`
//         }) 
//         i += letterArray.length
//         indexOfCurrentWord++
//     }
//     gameboard.innerHTML += `<div>${returnRandomLetter()}</div>`
// };


// const putWordOnBoard = () => {
//     const word = wordsToFind[currentWordIndex];
//     const wordLength = word.length;
//     const startRow = Math.floor(Math.random() * (10 - wordLength));
//     const startColumn = Math.floor(Math.random() * (10 - wordLength));
//     const endRow = startRow + wordLength - 1;
//     const endColumn = startColumn + wordLength - 1;
    
//     let index = 0;
//     for (let i = 0; i < 100; i++) {
//         const row = Math.floor(i / 10);
//         const column = i % 10;
//         if (row >= startRow && row <= endRow && column >= startColumn && column <= endColumn) {
//             gameboard.innerHTML += `<div class="letter">${word[index]}</div>`;
//             index++;
//         } else {
//             gameboard.innerHTML += `<div>${returnRandomLetter()}</div>`;
//         }
//     }
//     currentWordIndex++;
// };


// const putWordOnBoard = () => {

// }
// putWordOnBoard()
// for (let i = 0; i < 100; i++) {
//    if (i == 3 || i == 13 || i == 43) {
//        let letterArray = wordsToFind[currentWordIndex].split("")
//        letterArray.forEach((letter)=>{
//            gameboard.innerHTML += `<div>${letter}</div>`
//        }) 
//        i += letterArray.length
//        currentWordIndex++
//    }
//    gameboard.innerHTML += `<div>${returnRandomLetter()}</div>`
// };


//  returns a random letter from the alphabet array.

// const putWordOnBoard = () => {
//     gameboard.innerHTML = ""; // clear the game board first
//     wordsToFind.forEach((word) => {
//       const letterArray = word.split("");
//       letterArray.forEach((letter) => {
//         gameboard.innerHTML += `<div>${letter}</div>`;
//       });
//       for (let i = 0; i < 10 - letterArray.length; i++) {
//         gameboard.innerHTML += `<div>${returnRandomLetter()}</div>`;
//       }
//     });
//   };

// const checkIfWordIsFound = () => {
//     const letters = document.getElementById("letter");
//     const word = wordsToFind[wordsFound];
//     const found = Array.from(letters).reduce((acc, curr) => acc + curr.textContent, "") === word;
//     if (found) {
//         wordsFound++;
//         message.textContent = `You found ${word}!`;
//         if (wordsFound === wordsToFind.length) {
//             message.textContent = "Congratulations, you found all the words!";
//             clearInterval(timerInterval);
//         }
//     }
// };