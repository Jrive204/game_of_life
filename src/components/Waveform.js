import React, { Component } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

// import { WaveformContianer, Wave, PlayButton } from './Waveform.styled';

export const WaveformContianer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  background: transparent;
`;
export const Wave = styled.div`
  width: 50%;
  height: 90px;
`;
export const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: #efefef;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  padding-bottom: 3px;
  &:hover {
    background: #ddd;
  }
`;

class Waveform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      value: 100,
      song: this.props.ranSongfromArray,
    };
    this.props.songRef.current = this.state.song;
  }

  componentDidMount() {
    const track = document.querySelector('#track');

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'MediaElement',
      height: 100,
      progressColor: '#2D5BFF',
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent',
      forceDecode: true,
      pixelRatio: 1,
      //   fillParent: false,
      scrollParent: true,
      hideScrollbar: true,
    });

    this.waveform.load(this.state.song);
    // this.waveform.on('waveform-ready', function () {
    //   return alert('READY');
    // });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.widthCheck !== this.props.widthCheck) {
      if (this.props.widthCheck && this.waveform) {
        this.waveform.pause();
        this.setState({ playing: false });
        this.props.resetGrid();
      } else if (!this.props.widthCheck && this.waveform) {
        this.waveform.pause();
        this.setState({ playing: false });
        this.props.resetGrid();
      }
    }
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
    this.props.playAudio();
    if (this.props.running) {
      this.setState({
        song: this.props.ranSongfromArray,
      });
      this.waveform.load(this.props.ranSongfromArray);
      setTimeout(() => {
        this.props.songRef.current = this.state.song;
      }, 0);
    }
  };
  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
    this.waveform.setVolume(newValue / 100);
  };

  render() {
    var length = this.waveform?.getDuration();
    var start = 0;
    var end = length;
    let peaks = this.waveform?.backend.getPeaks(length, start, end);
    console.log(this.waveform?.getFilters(), 'peaksss');

    console.log(
      peaks,
      length,
      'PEAKS'
      //   (this.props.timeRef.current = 600)
    );

    return (
      <>
        <div
          style={{
            width: 100,
            color: 'orange',
            margin: '10px auto',
          }}
        >
          {this.props.widthCheck ? this.handlePlay : null}
          <Grid container spacing={2}>
            <Grid item>
              <VolumeUp />
            </Grid>
            <Grid item xs>
              <Slider
                value={this.state.value}
                onChange={this.handleChange}
                aria-labelledby='continuous-slider'
              />
            </Grid>
            {console.log(this.state.song, 'WHAT ARE YOU')}
            <figcaption
              style={{ color: '#2E9CCA', textAlign: 'center', marginTop: '2%' }}
            >
              {this.props.running &&
                (this.state.song === this.props.aud
                  ? 'Listening to : Luna Llena'
                  : this.state.song === this.props.aud2
                  ? 'Listening to : Bensound-Dubstep'
                  : this.state.song === this.props.aud3
                  ? 'Listening to : Dance Of Spring'
                  : 'Listening to : Saint Jhn Roses Imanbek')}
              {/* ADJUST SPEED */}
            </figcaption>
            {console.log(
              this.waveform?.backend.getPeaks(this.waveform),
              'WHAT ARE YOU'
            )}
          </Grid>
        </div>
        <WaveformContianer>
          <PlayButton
            style={{
              position: 'absolute',
              top:
                this.props.height <= 600
                  ? '30%'
                  : this.props.height <= 820
                  ? '20%'
                  : '18%',
              color: 'white',
              background: !this.props.running ? 'green' : 'gray',
            }}
            onClick={this.handlePlay}
          >
            {!this.state.playing ? (
              <PlayArrowIcon fontSize='default' />
            ) : (
              <StopIcon fontSize='default' />
            )}
          </PlayButton>
          <Wave id='waveform' />
          {/* <audio id='track' src={this.props.ranSongfromArray} /> */}
        </WaveformContianer>
      </>
    );
  }
}

export default Waveform;
