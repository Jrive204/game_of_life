import React from 'react';

const Grid = (props) => {
  const {
    setSwiping,
    setGrid,
    produce,
    grid,
    isSwiping,
    numCols,
    sample,
    sum,
  } = props;

  let color = ['#E27D60', 'blue', 'red'];

  console.log(sum, 'SUM');

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols},15px)`,
        justifyContent: 'center',
      }}
      onBlur={() => setSwiping(false)}
    >
      {grid.map((rows, i) =>
        rows.map((col, k) => (
          <div
            key={`${i}-${k}`}
            onClick={() => setSwiping(!isSwiping)}
            onMouseOver={() => {
              if (isSwiping) {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });

                setGrid(newGrid);
              }
            }}
            style={{
              width: 12,
              height: 13,
              backgroundColor:
                grid[i][k] && sum > 60
                  ? sample(color)
                  : grid[i][k] && sum > 35
                  ? 'red'
                  : grid[i][k] && sum > 15
                  ? 'blue'
                  : grid[i][k]
                  ? '#E27D60'
                  : undefined,
              border: 'solid 1.3px #5D6D7E',
              cursor: isSwiping ? 'copy' : 'pointer',
            }}
          />
        ))
      )}
    </div>
  );
};

export default Grid;
