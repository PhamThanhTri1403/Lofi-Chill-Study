import React, { useState } from 'react';

import './Home.scss';
import { useSelector } from 'react-redux';
import RainToggleButton from '../RainToggleButton/RainToggleButton';
import ModifierBoard from '../ModifierBoard/ModifierBoard';
import Footer from '../Footer/Footer';
import { useTimer } from 'react-timer-hook';
import YoutubeVideo from '../YoutubeVideo/YoutubeVideo';
import VideoSelector from '../VideoSelector/VideoSelector';
import PDFViewer from '../PDFViewer/PDFViewer';

const Home = () => {
  const [timerStart, setTimerStart] = useState(false);
  const [useCustomVideo, setUseCustomVideo] = useState(false);
  const [selectedVideoPath, setSelectedVideoPath] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  
  // State for ModifierBoard panels (controlled by VideoSelector)
  const [openMood, setOpenMood] = useState(false);
  const [openFocus, setOpenFocus] = useState(false);

  const daynight = useSelector((state) => state.modeState);
  const rain = useSelector((state) => state.rainState);

  const { mode } = daynight;
  const { rainMode } = rain;

  const combineMode = `${mode}-${rainMode}`;

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 0);

  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => setTimerStart(false),
    });

  const setTimerHandler = (hour, minute, second) => {
    const time = new Date();
    const setupTimer =
      Number(hour) * 3600 + Number(second) + Number(minute) * 60;
    time.setSeconds(time.getSeconds() + setupTimer);
    restart(time);
  };

  return (
    <>
      {!useCustomVideo && (
        <>
          {/* Embedded the background video base on each state */}
          {/* Night */}
          <video
            className={combineMode === 'night-clear' ? 'videoIn' : 'videoOut'}
            autoPlay
            loop
            muted
          >
            <source src='/assets/video/Night-clear.mp4' type='video/mp4' />
          </video>
          <video
            className={combineMode === 'night-rain' ? 'videoIn' : 'videoOut'}
            autoPlay
            loop
            muted
          >
            <source src='/assets/video/Night-rainny.mp4' type='video/mp4' />
          </video>
          {/* Day */}
          <video
            className={combineMode === 'day-clear' ? 'videoIn' : 'videoOut'}
            autoPlay
            loop
            muted
          >
            <source src='/assets/video/Day-sunny.mp4' type='video/mp4' />
          </video>
          <video
            className={combineMode === 'day-rain' ? 'videoIn' : 'videoOut'}
            autoPlay
            loop
            muted
          >
            <source src='/assets/video/Day-rainny.mp4' type='video/mp4' />
          </video>
        </>
      )}
      {useCustomVideo && selectedVideoPath && (
        <video
          className="videoIn"
          autoPlay
          loop
          muted
          src={selectedVideoPath}
        />
      )}
      <VideoSelector 
        setUseCustomVideo={setUseCustomVideo} 
        setSelectedVideoPath={setSelectedVideoPath} 
        openMood={openMood}
        setOpenMood={setOpenMood}
        openFocus={openFocus}
        setOpenFocus={setOpenFocus}
        setPdfFile={setPdfFile}
      />
      {pdfFile && <PDFViewer pdfFile={pdfFile} onClose={() => setPdfFile(null)} />}
      <div className="vertical-controls">
        <RainToggleButton />
        <ModifierBoard
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
          openMood={openMood}
          openFocus={openFocus}
        />
        <YoutubeVideo />
      </div>
      <Footer />
    </>
  );
};

export default Home;
