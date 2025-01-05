# Tic-Tac-Toe - The Odin Project

This is a Pokémon-themed, 2-player Tic-Tac-Toe game built as part of The Odin Project's JavaScript module. The main goal of this project was to practice modular JavaScript and focus on minimizing the use of global code. I utilized IIFEs (Immediately Invoked Function Expressions) to organize the logic and applied the module pattern to keep the code clean and maintainable.

### Features:
- Two-Player Gameplay: Players take turns on the same device, choosing their respective moves.
- Game Logic: The game follows the standard Tic-Tac-Toe rules, where players alternate moves until one wins or the game ends in a draw. Players can decide after each round to keep playing or restart chosing another Pokémon.
- Custom Player Objects: Players are created using a factory function that allows dynamic input and customization.
- Check for Winner: The game checks for a winner after each move, announces the result and prevents further moves once the game is over.
  
### Technologies:
- IIFE & Module Pattern: I initially built the game logic as console-based to get the fundamentals in place. Then I transitioned to an HTML and CSS version while keeping as little global code as possible by using IIFEs and modules.
- Closure and Scope: This project helped me better understand the concepts of closure and scope within JavaScript.
- HTML/CSS: The user interface was built with responsive HTML and CSS, themed with Pokémon references for a fun twist.
  
### Approach:
- Started by developing the game logic in the console first to get a feel for the functionality and behavior. This helped me break down the challenge into smaller and manageable pieces.
- Built a game board module to handle the board state and render the game.
- Created a game module to manage the turns, handle moves, and detect when the game is over.
- Added a form to allow users to input their names and create player objects.
