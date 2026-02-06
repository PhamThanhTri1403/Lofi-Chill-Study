import React, { useState } from 'react';
import { useMusic } from '../../contexts/MusicContext';
import Playlist from '../Playlist/Playlist';
import './Player.scss';

const Player = () => {
  const { 
    currentTrackIndex, 
    isPlaying, 
    currentPlaylist, 
    playPause, 
    nextTrack, 
    prevTrack 
  } = useMusic();

  const [showPlaylist, setShowPlaylist] = useState(false);

  const currentSong = currentPlaylist[currentTrackIndex];

  return (
    <>
      <div className='music-player glass-panel'>
        <div className='song-info'>
          <span className='song-name'>{currentSong ? currentSong.name : 'Lofi Music'}</span>
          <span className='song-artist'>Lofi Chill</span>
        </div>
        
        <div className='music-player--controls'>
          <button className='control-btn skip-btn' onClick={prevTrack}>
            <img src='/assets/icons/prev.svg' alt='Previous' />
          </button>
          
          <button className='control-btn play-btn' onClick={playPause}>
            {isPlaying ? (
              <img src='/assets/icons/pause.svg' alt='Pause' />
            ) : (
              <img src='/assets/icons/play.svg' alt='Play' />
            )}
          </button>
          
          <button className='control-btn skip-btn' onClick={nextTrack}>
            <img src='/assets/icons/next.svg' alt='Next' />
          </button>

          <button className='control-btn playlist-btn' onClick={() => setShowPlaylist(true)} title="Playlist">
             <i className="fas fa-list"></i>
          </button>
        </div>
      </div>

      <Playlist isOpen={showPlaylist} onClose={() => setShowPlaylist(false)} />
    </>
  );
};

export default Player;
