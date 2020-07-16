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

#### About

- On the main entry point of the application, include a separate section
  or link to another page or popup that describes the two main rules
  (birth & death) of Conway’s Game of Life

### Deployment

- Deploy your app using a tool like [GitHub Pages or
  Heroku](resources/deployment)

## Stretch Goals

- Implement 2+ additional custom features, above
- Deploy your app to a hosting service or, for iOS, to TestFlight (or
  the App Store!). Web devs can see [more deployment info
  here](resources/deployment).
- Write a how-to guide or blog post that walks readers through the
  work you did to implement your project
- Expand your simulation into the third dimension. Google `3D Conways Life`. Google for how to do 3D stuff on your platform. Web users might
  check out [3D-ThreeJS](https://github.com/LambdaSchool/3D-ThreeJS),
  and iOS might look at [SceneKit](https://developer.apple.com/scenekit/).
- Explore alternate algorithms for finding the nth generation, such
  as [Hashlife](https://en.wikipedia.org/wiki/Hashlife)

## Sample Wireframe

Example wireframes here. _This is only one possible layout. You can use
any layout you come up with, as long as it completes MVP._

We encourage you to be creative with your presentation and make it your
own.

### Mobile

iOS example, could also inspire mobile web.

![wireframe](resources/ios/game-of-life-iOS-mock-1.png)
![wireframe](resources/ios/game-of-life-iOS-mock-2.png)

### Desktop/Tablet

![wireframe](wireframes/wireframe_1.png)

## Rubric

**Your simulation will receive a 2 when it satisfies the following:**

1.  Display includes a text area that shows the current generation of
    cells being displayed
2.  Display includes a grid of cells, at least 25x25, that can be
    toggled to be _alive_ or _dead_
3.  Display includes working buttons that start / stop the animation
    and clear the grid
4.  Algorithm to generate new generations of cells correctly
    implemented
5.  At least 3 features from **_Custom Features_** section
    successfully implemented
6.  Application includes a section outlining the rules to Conway's
    "Game of Life"

**Your simulation will receive a 3 when it satisfies all of the above
requirements AND implements one of the above stretch goals.**

## Track-Specific Help

Channels for help that's about your specific technologies, if the TLs
and/or instructor doesn't have enough knowledge in that area.

- DS: Your cohort channel
- iOS: #ios_help
- Web: Your cohort channel

## Additional Resources

For various platforms:

- [Resources](resources/)
