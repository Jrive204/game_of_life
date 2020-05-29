import React, { useState, useCallback, useRef, useEffect } from 'react';
import './App.css';
import produce from 'immer';
import { makeStyles, IconButton } from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from './components/Grid';
import useWindowDimensions from './components/hooks/useWindowDimensions';
import CasinoIcon from '@material-ui/icons/Casino';
import aud from './components/audio/Luna Llena (Live).mp3';
import aud2 from './components/audio/bensound-dubstep.mp3';
import aud3 from './components/audio/Jesse Cook Dance Of Spring [Xsongspk.me].mp3';
import aud4 from './components/audio/Saint Jhn Roses Imanbek [Xsongspk.me].mp3';
import Waveform from './components/Waveform';
var sample = require('lodash.sample');

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

// Audio tracks for media-player
const ranSong = [aud, aud3, aud2, aud4, aud, aud3, aud2, aud4];

// Operations which run the rules for Game of Life
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
  // Adjusting Width inorder to create a responsive design
  const numRows = width < 500 ? 20 : 30;
  const numCols = width < 500 ? 20 : 30;
  const widthCheck = width < 500;
  const [running, setrunning] = useState(false);
  const timeRef = useRef(250);
  const songRef = useRef('');

  const [ranSongfromArray, setranSongfromArray] = useState(sample(ranSong));
  const [generation, setgeneration] = useState(0);

  // Audio player using HTML5, using Js to toggle songs playing

  function playAudio() {
    setrunning(!running);
    if (!running) {
      runningRef.current = true;
      runSim();
      setranSongfromArray(sample(ranSong));
    }
  }

  //  Speed function

  function setSpeed(initialTime, a, b, c, d) {
    timeRef.current = initialTime;
    setTimeout(() => {
      timeRef.current = 150;
    }, 1000);
  }
  // Looking for Width change, if it hits responsive range it shuts off audio and resets/pauses the grid
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

  useEffect(() => {
    console.log('hello');
  }, [songRef.current]);

  // Initial state for Rows, it creates the rows based on columns

  function initialState() {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  }

  const [grid, setGrid] = useState(initialState);
  const [isSwiping, setSwiping] = useState(false);
  const [sum, setSum] = useState(0);
  const classes = useStyles();

  // Avoid unnecessary re-renders
  const runningRef = useRef(running);

  runningRef.current = running;

  function resetGrid() {
    setGrid(initialState);
    setgeneration(0);
    setSum(0);
  }

  const runSim = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      let validgrid = false;

      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              validgrid = true;
              gridCopy[i][j] = 1;
            }
          }
        }

        if (validgrid) {
          setgeneration((e) => (e += 1));
        }

        setSum(
          gridCopy.flat().reduce((acc, cv) => {
            return acc + cv;
          })
        );
      });
    });

    setTimeout(runSim, timeRef.current);
  }, [numRows, numCols]);

  console.log(ranSongfromArray, 'RANSONG', height);
  console.log(sum, timeRef.current, 'SUM', songRef.current);
  return (
    <>
      <h1
        style={{
          color: '#2E9CCA',
          textAlign: 'center',
          fontWeight: 'bolder',
        }}
      >
        Conway's "Game of Life"
      </h1>
      <p
        style={{
          color: '#2E9CCA',
          textAlign: 'center',
          fontWeight: 'bolder',
          fontSize: '16px',
        }}
      >
        Generation: {generation}
        <br />
        Population: &nbsp;{sum}
      </p>

      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            display: 'flex',
            margin: '0 0 1% 0',
            width: '40%',
            justifyContent: !widthCheck ? 'space-evenly' : 'space-between',
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
              setSum(rows.flat().reduce((acc, cv) => acc + cv));
            }}
          >
            <CasinoIcon fontSize='default' />
          </IconButton>
          <IconButton
            variant='contained'
            style={{ color: 'white', background: 'red' }}
            className={classes.button}
            onClick={resetGrid}
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
        sample={sample}
        sum={sum}
      />

      <Waveform
        sample={sample}
        ranSong={ranSong}
        runSim={runSim}
        playAudio={playAudio}
        ranSongfromArray={ranSongfromArray}
        setranSongfromArray={setranSongfromArray}
        running={running}
        aud={aud}
        aud2={aud2}
        aud3={aud3}
        resetGrid={resetGrid}
        widthCheck={widthCheck}
        timeRef={timeRef}
        setSpeed={setSpeed}
        songRef={songRef}
        height={height}
      />
    </>
  );
}

export default App;
