import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

import './ModifierBoard.scss';
import { changeMoodStatus, changeRainStatus, changeVolume } from '../../redux/actions';
import CountDownTimer from '../CountDownTimer/CountDownTimer';
import TodoList from '../TodoList/TodoList';

const ModifierBoard = ({
  seconds,
  minutes,
  hours,
  isRunning,
  pause,
  resume,
  restart,
  setTimerHandler,
  setTimerStart,
  timerStart,
  openMood,
  openFocus
}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.moodState);
  const rainData = useSelector((state) => state.rainState);
  const volumeData = useSelector((state) => state.volumeState);

  const { rainValue } = rainData;
  const { moodMode } = data;
  const { volumeValue } = volumeData;

  // Sound states
  const [cityTraffic, setCityTraffic] = useState(0);
  const [cityRain, setCityRain] = useState(rainValue);
  const [fireplace, setFireplace] = useState(0);
  const [snow, setSnow] = useState(0);
  const [summerStorm, setSummerStorm] = useState(0);
  const [fan, setFan] = useState(0);
  const [forestNight, setForestNight] = useState(0);
  const [wave, setWave] = useState(0);
  const [wind, setWind] = useState(0);
  const [people, setPeople] = useState(0);
  const [river, setRiver] = useState(0);
  const [rainForest, setRainForest] = useState(0);

  const rainSliderHandler = (e) => {
    const value = e.target.value;
    if (value > 0) dispatch(changeRainStatus('clear', value));
    else if (value === 0) dispatch(changeRainStatus('rain', 0));
    setCityRain(value);
  };

  const changeMoodHandler = (e) => {
    dispatch(changeMoodStatus(e.target.id));
  };

  const changeVolumeHandler = (e) => {
    dispatch(changeVolume(e.target.value));
  };

  return (
    <>
      {/* Mood Panel */}
      <div className={`modifierBox mood-box glass-panel ${openMood ? 'active' : ''}`}>
        <h4>Mood & Sounds</h4>
        
        <div className="control-group">
          <label>Master Volume</label>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <i className="fas fa-volume-down"></i>
            <Slider 
              value={volumeValue} 
              onChange={changeVolumeHandler} 
              className="volume-slider"
              sx={{ color: '#f3a952' }}
            />
            <i className="fas fa-volume-up"></i>
          </Stack>
        </div>

        <div className="mood-options">
           <button id="chill" onClick={changeMoodHandler} className={moodMode === 'chill' ? 'active' : ''}>Chill</button>
           <button id="jazzy" onClick={changeMoodHandler} className={moodMode === 'jazzy' ? 'active' : ''}>Jazzy</button>
           <button id="sleep" onClick={changeMoodHandler} className={moodMode === 'sleep' ? 'active' : ''}>Sleep</button>
        </div>

        <div className="sounds-grid">
           <SoundItem icon="fas fa-cloud-rain" label="City Rain" value={cityRain} onChange={rainSliderHandler} src="/assets/musics/rain_city.mp3" />
           <SoundItem icon="fas fa-car" label="City Traffic" value={cityTraffic} onChange={(e) => setCityTraffic(e.target.value)} src="/assets/musics/city_traffic.mp3" />
           <SoundItem icon="fas fa-fire" label="Fireplace" value={fireplace} onChange={(e) => setFireplace(e.target.value)} src="/assets/musics/fireplace.mp3" />
           <SoundItem icon="fas fa-snowflake" label="Snow" value={snow} onChange={(e) => setSnow(e.target.value)} src="/assets/musics/snow.mp3" />
           <SoundItem icon="fas fa-bolt" label="Summer Storm" value={summerStorm} onChange={(e) => setSummerStorm(e.target.value)} src="/assets/musics/summer_storm.mp3" />
           <SoundItem icon="fas fa-fan" label="Fan" value={fan} onChange={(e) => setFan(e.target.value)} src="/assets/musics/fan.mp3" />
           <SoundItem icon="fas fa-tree" label="Forest Night" value={forestNight} onChange={(e) => setForestNight(e.target.value)} src="/assets/musics/forest_night.mp3" />
           <SoundItem icon="fas fa-water" label="Waves" value={wave} onChange={(e) => setWave(e.target.value)} src="/assets/musics/waves.mp3" />
           <SoundItem icon="fas fa-wind" label="Wind" value={wind} onChange={(e) => setWind(e.target.value)} src="/assets/musics/wind.mp3" />
           <SoundItem icon="fas fa-users" label="People" value={people} onChange={(e) => setPeople(e.target.value)} src="/assets/musics/people_talk_inside.mp3" />
           <SoundItem icon="fas fa-stream" label="River" value={river} onChange={(e) => setRiver(e.target.value)} src="/assets/musics/river.mp3" />
           <SoundItem icon="fas fa-cloud-showers-heavy" label="Rain Forest" value={rainForest} onChange={(e) => setRainForest(e.target.value)} src="/assets/musics/rain_forest.mp3" />
        </div>
      </div>

      {/* Focus Panel */}
      <div className={`modifierBox focus-box glass-panel ${openFocus ? 'active' : ''}`}>
          <h4>Focus Tools</h4>
          <div className="focus-content">
            <CountDownTimer 
              seconds={seconds}
              minutes={minutes}
              hours={hours}
              isRunning={isRunning}
              pause={pause}
              resume={resume}
              restart={restart}
              setTimerHandler={setTimerHandler}
              setTimerStart={setTimerStart}
              timerStart={timerStart}
            />
            <div className="divider"></div>
            <TodoList />
          </div>
      </div>
    </>
  );
};

const SoundItem = ({ icon, label, value, onChange, src }) => (
  <div className="sound-item" title={label}>
    <div className="icon-wrapper">
      <i className={icon}></i>
    </div>
    <Slider 
      value={value} 
      onChange={onChange} 
      size="small"
      sx={{ 
        color: value > 0 ? '#f3a952' : 'rgba(255,255,255,0.3)',
        '& .MuiSlider-thumb': {
          width: 12,
          height: 12,
        }
      }}
    />
    <ReactAudioPlayer
      src={src}
      volume={value / 100}
      autoPlay={true}
      loop
    />
  </div>
);

export default ModifierBoard;
