# Cellular Automata and Conway's "Game of Life"


Welcome to John Conway's "Game of Life"! This is a computer science
classic from 1970, a program that simulates a _cellular automaton_
(plural _automata_). It has connections to all kinds of different
aspects of computer science and nature.

![example-patterns](https://media.giphy.com/media/4VVZTvTqzRR0BUwNIH/giphy.gif)

[from Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns)

## Rules

- Any live cell with fewer than two live neighbours dies, as if by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## MVP Features

- Grid to display cells (these cells are just divs).
- Cell objects Properties
    -  Maintain current state based on condition: (alive, dead)
    - Clickable/Tappable
- Grid resizes itself based on screen size.
- Text to display current generation # being displayed
- Button(s) that start & stop the animation
- Button to clear the grid
- algorithm:
  - For each cell in the current generation's grid:
    1. Examines state of all eight neighbors
    2. Apply rules of life to determine if this cell will change states
    3. When main loop completes:
       1. Swap current and next grids
       2. Repeat until simulation stopped
- Uses double buffering to update grid with next generation.

### Custom Features

- Cells change colors based on how many cells are currently alive 
- A music player is attached playing randomized songs when simulation begins.
- Cells speed is based on the tempo of the music, the sound wave tempo is shown at the bottom


### Mobile

- At 500px breakpoint, grid lowers in size and buttons adjust for mobile view

