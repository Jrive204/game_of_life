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
  state = {
    playing: false,
    value: 100,
    song: this.props.ranSongfromArray,
  };

  componentDidMount() {
    const track = document.querySelector('#track');

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'MediaElement',
      height: 80,
      progressColor: '#2D5BFF',
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent',
      //   mediaControls: true,
      //   partialRender: true,
      forceDecode: true,
      pixelRatio: 1,
      //   fillParent: false,
      scrollParent: true,
      hideScrollbar: true,
    });

    this.waveform.load(this.state.song);
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
    }
  };
  handleChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });
    this.waveform.setVolume(newValue / 100);
  };

  render() {
    return (
      <>
        <div
          style={{
            width: 100,
            color: 'orange',
            margin: '10px auto',
          }}
        >
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
            </figcaption>
          </Grid>
        </div>
        <WaveformContianer>
          <PlayButton
            style={{
              position: 'absolute',
              top: '13.6%',
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
