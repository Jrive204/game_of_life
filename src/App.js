import React, { useState, useCallback, useRef, useEffect } from 'react';
import './App.css';
import produce from 'immer';
import { ButtonBase, Button, makeStyles, IconButton } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from './components/Grid';
import useWindowDimensions from './components/hooks/useWindowDimensions';
import CasinoIcon from '@material-ui/icons/Casino';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function App() {
  const { height, width } = useWindowDimensions();
  const numRows = width < 500 ? 20 : 30;
  const numCols = width < 500 ? 20 : 30;
  const widthCheck = width < 500;
  const [running, setrunning] = useState(false);

  function playAudio() {
    const sound = document.getElementsByClassName('audio-element')[0];
    sound.play();
  }
  function pauseAudio() {
    const sound = document.getElementsByClassName('audio-element')[0];
    sound.pause();
    sound.currentTime = 0;
  }

  useEffect(() => {
    setrunning(false);
    setGrid(() => {
      const rows = [];
      for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
      }
      return rows;
    });
  }, [widthCheck, numCols, numRows]);

  // console.log(widthCheck);
  function initialState() {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  }

  const [grid, setGrid] = useState(initialState);
  const [isSwiping, setSwiping] = useState(false);
  const classes = useStyles();

  const runningRef = useRef(running);

  runningRef.current = running;

  const runSim = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSim, 300);
  }, [numRows, numCols]);

  return (
    <>
      <audio className='audio-element'>
        <source src='https://www.bensound.com/bensound-music/bensound-dubstep.mp3' />
      </audio>

      <h1
        style={{
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bolder',
        }}
      >
        Conway's "Game of Life"
      </h1>
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            margin: '0 0 1% 0',
            width: '20%',
            justifyContent: 'space-evenly',
          }}
        >
          <IconButton
            variant='contained'
            style={{ background: 'darkblue', color: 'white' }}
            className={classes.button}
            onClick={() => {
              const rows = [];
              for (let i = 0; i < numRows; i++) {
                rows.push(
                  Array.from(Array(numCols), () =>
                    Math.random() > 0.7 ? 1 : 0
                  )
                );
              }

              setGrid(rows);
            }}
          >
            <CasinoIcon fontSize='default' />
          </IconButton>
          {!runningRef.current ? (
            <IconButton
              variant='contained'
              className={classes.button}
              style={{ background: 'green', color: 'white' }}
              onClick={() => {
                playAudio();
                setrunning(!running);
                if (!running) {
                  runningRef.current = true;
                  runSim();
                }
              }}
            >
              <PlayArrowIcon fontSize='default' />
            </IconButton>
          ) : (
            <IconButton
              variant='contained'
              className={classes.button}
              style={{ background: 'grey', color: 'white' }}
              onClick={() => {
                pauseAudio();
                setrunning(!running);
                if (!running) {
                  runningRef.current = true;
                  runSim();
                }
              }}
            >
              <StopIcon fontSize='default' />
            </IconButton>
          )}
          <IconButton
            variant='contained'
            style={{ color: 'white', background: 'red' }}
            className={classes.button}
            onClick={() => {
              setGrid(initialState);
            }}
          >
            <DeleteIcon fontSize='default' />
          </IconButton>
        </div>
      </section>
      <Grid
        setSwiping={setSwiping}
        grid={grid}
        isSwiping={isSwiping}
        produce={produce}
        setGrid={setGrid}
        numCols={numCols}
      />
    </>
  );
}

export default App;
