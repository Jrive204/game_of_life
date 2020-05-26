import React from 'react';

const Grid = (props) => {
  const { setSwiping, setGrid, produce, grid, isSwiping, numCols } = props;
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
              backgroundColor: grid[i][k] ? 'orange' : undefined,
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
