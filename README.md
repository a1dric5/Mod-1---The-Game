#Word Search Game
This is a simple word search game built using HTML, CSS, and JavaScript. The game randomly generates a grid of letters and hides a number of words in the grid for the player to find. The player must find all the hidden words before the time runs out.

##How to Play
1. Open the index.html file in a web browser to start the game.
2. The game will display a grid of letters and a list of words to find.
3. Click and drag your mouse over the letters to select a word. You can select words in any direction (horizontally, vertically, diagonally).
4. Once you have found a word, it will be highlighted on the grid and crossed off the list of words to find.
5. Keep finding words until you have found them all!
6. If you get stuck, you can click the "Reset" button to start over.
7. The game will end when you have found all the words or the time runs out.

##How the Game Works
The game randomly generates a grid of letters and hides a number of words in the grid for the player to find. The player must find all the hidden words before the time runs out.

The game includes an array of strings containing the words that the player needs to find. These words are displayed in a list on the screen.

The game generates a 10x10 grid of letters. Each letter in the grid is randomly chosen from the alphabet. The words to find are hidden in the grid in random positions and directions (horizontally, vertically, diagonally).

The player interacts with the game by clicking and dragging the mouse over the letters to select a word. When the player selects a word, the game checks if the word is one of the words to find. If it is, the word is highlighted on the grid and crossed off the list of words to find. If the player finds all the words before the time runs out, they win the game. If the time runs out before all the words are found, the game ends and the player loses.

##Files
The game consists of the following files:

index.html: The main HTML file for the game. Contains the structure of the page and includes links to the CSS and JS files.

index.css: The CSS file for the game. Contains styling for the game board and other elements on the page.

index.js: The JavaScript file for the game. Contains the logic for generating the game board, hiding the words in the grid, checking if the player has found a word, and handling user interactions.

##Future Enhancements
Here are some ideas for improving the game in the future:

Add sound effects and background music to make the game more immersive.
Add more levels and make them progressively more difficult to keep the game engaging for longer.
Implement a two-player mode where players can compete against each other.
Create a more visually appealing user interface with better graphics and animations.
