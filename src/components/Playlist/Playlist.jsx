import React from 'react';
import { useMusic } from '../../contexts/MusicContext';
import './Playlist.scss';

const Playlist = ({ isOpen, onClose }) => {
  const { currentPlaylist, currentTrackIndex, playTrack, isPlaying } = useMusic();

  if (!isOpen) return null;

  return (
    <div className='playlist-overlay' onClick={onClose}>
      <div className='playlist-container glass-panel' onClick={(e) => e.stopPropagation()}>
        <div className='playlist-header'>
          <h3>Current Playlist</h3>
          <button className='close-btn' onClick={onClose}>
            <i className='fas fa-times'></i>
          </button>
        </div>
        
        <div className='playlist-content'>
          {currentPlaylist.map((song, index) => (
            <div 
              key={index} 
              className={`playlist-item ${currentTrackIndex === index ? 'active' : ''}`}
              onClick={() => playTrack(index)}
            >
              <div className='song-indicator'>
                {currentTrackIndex === index && isPlaying ? (
                  <div className='playing-gif'>
                    <span></span><span></span><span></span>
                  </div>
                ) : (
                  <span className='song-number'>{index + 1}</span>
                )}
              </div>
              <div className='song-details'>
                <span className='song-name'>{song.name}</span>
                <span className='song-mood'>{song.mood}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
