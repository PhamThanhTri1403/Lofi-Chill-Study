import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player/lazy';
import { setMode, setRain, signInAPI, signOutAPI, changeDayNight, setMood, toggleAutoTheme, applyScheduledTheme } from '../../redux/actions';
import TodoList from '../TodoList/TodoList';
import PDFSelector from '../PDFSelector/PDFSelector';
import './VideoSelector.scss';

const VideoSelector = ({ 
  setUseCustomVideo, 
  setSelectedVideoPath, 
  openMood, 
  setOpenMood, 
  openFocus, 
  setOpenFocus,
  setPdfFile
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const mode = useSelector((state) => state.modeState.mode);
  const { autoTheme } = useSelector((state) => state.themeScheduleState);
  
  const [activeSection, setActiveSection] = useState('');
  const [activeToolTab, setActiveToolTab] = useState('todo'); // 'todo' or 'pdf'
  const [customUrl, setCustomUrl] = useState('');
  
  // Custom Music State
  const [musicUrl, setMusicUrl] = useState('');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);

  const toggleSection = (section) => {
    if (activeSection === section) {
      setActiveSection('');
    } else {
      setActiveSection(section);
      if (['scenes', 'music', 'settings', 'tools'].includes(section)) {
        setOpenMood(false);
        setOpenFocus(false);
      }
    }
  };

  const handleMoodClick = () => {
    setOpenMood(!openMood);
    setOpenFocus(false);
    setActiveSection('');
  };

  const handleFocusClick = () => {
    setOpenFocus(!openFocus);
    setOpenMood(false);
    setActiveSection('');
  };

  const scenes = [
    { name: 'Ngày - Nắng', mode: 'day', rain: 'clear', icon: '☀️' },
    { name: 'Ngày - Mưa', mode: 'day', rain: 'rain', icon: '🌧️' },
    { name: 'Đêm - Sao', mode: 'night', rain: 'clear', icon: '🌙' },
    { name: 'Đêm - Mưa', mode: 'night', rain: 'rain', icon: '⛈️' },
  ];

  const extraScenes = [
    { 
      category: 'Mùa Thu',
      items: [
        { name: 'Phòng Ngủ', video: '/assets/video/autumn-bedroom-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/autumn-bedroom-moewalls-com.png' },
        { name: 'Đêm Thu', video: '/assets/video/autumn-bedroom-nightmoewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/autumn-bedroom-nightmoewalls-com.png' }
      ]
    },
    { 
      category: 'Trạm Xe Buýt',
      items: [
        { name: 'Hoàng Hôn', video: '/assets/video/black-cat-bus-stop-at-dusk-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/black-cat-bus-stop-at-dusk-moewalls-com.png' },
        { name: 'Đêm Khuya', video: '/assets/video/black-cat-bus-stop-at-dusk-night-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/black-cat-bus-stop-at-dusk-night-moewalls-com.png' }
      ]
    },
    { 
      category: 'Khu Vườn',
      items: [
        { name: 'Chiều Tà', video: '/assets/video/evening-sky-the-garden-of-words-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/evening-sky-the-garden-of-words-moewalls-com.png' },
        { name: 'Đêm Sao', video: '/assets/video/evening-sky-the-garden-of-words-night-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/evening-sky-the-garden-of-words-night-moewalls-com.png' }
      ]
    },
    { 
      category: 'Ngôi Nhà Lofi',
      items: [
        { name: 'Thư Giãn', video: '/assets/video/lofi-house-cloudy-day-1-clean-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/lofi-house-cloudy-day-1-clean-moewalls-com.png' },
        { name: 'Mưa Rơi', video: '/assets/video/lofi-house-cloudy-day-1-rain-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/lofi-house-cloudy-day-1-rain-moewalls-com.png' }
      ]
    },
    { 
      category: 'Di Tích',
      items: [
        { name: 'Yên Bình', video: '/assets/video/peaceful-ruins-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/peaceful-ruins-moewalls-com.png' },
        { name: 'Mưa Rừng', video: '/assets/video/peaceful-ruins-rain-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/peaceful-ruins-rain-moewalls-com.png' }
      ]
    },
    { 
      category: 'Ban Công Biển',
      items: [
        { name: 'Chạng Vạng', video: '/assets/video/serene-twilight-from-a-seaside-balcony-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/serene-twilight-from-a-seaside-balcony-moewalls-com.png' },
        { name: 'Biển Đêm', video: '/assets/video/serene-twilight-from-a-seaside-balcony-nightmoewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/serene-twilight-from-a-seaside-balcony-nightmoewalls-com.png' }
      ]
    },
    { 
      category: 'Khác',
      items: [
        { name: 'Thành Phố Hồng', video: '/assets/video/lofi-pink-town-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/lofi-pink-town-moewalls-com.png' },
        { name: 'Van Life', video: '/assets/video/lofi-van-life-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/lofi-van-life-moewalls-com.png' },
        { name: 'Bãi Biển', video: '/assets/video/peaceful-beach-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/peaceful-beach-moewalls-com.png' },
        { name: 'Hoa Hướng Dương', video: '/assets/video/sunflowers-summer-days-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/sunflowers-summer-days-moewalls-com.png' },
        { name: 'Nhà Nhật', video: '/assets/video/traditional-japanese-house-sunny-day-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/traditional-japanese-house-sunny-day-moewalls-com.png' },
        { name: 'Cắm Trại', video: '/assets/video/truckCampBackground.mp4', thumb: '/assets/video/thumbnails/user_images/truckCampBackground.png' },
        { name: 'Giáng Sinh', video: '/assets/video/winter-christmas-house-aurora-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/winter-christmas-house-aurora-moewalls-com.png' },
        { name: 'Tàu Đêm', video: '/assets/video/winter-night-train-moewalls-com.mp4', thumb: '/assets/video/thumbnails/user_images/winter-night-train-moewalls-com.png' }
      ]
    }
  ];

  const handleSceneSelect = (scene) => {
    setUseCustomVideo(false);
    dispatch(setMode(scene.mode, true));
    dispatch(setRain(scene.rain));
    // setActiveSection(''); // Keep panel open to allow exploring
  };

  const handleExtraSceneSelect = (videoPath) => {
    setUseCustomVideo(true);
    setSelectedVideoPath(videoPath);
    // setActiveSection(''); // Keep panel open
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customUrl) {
      setUseCustomVideo(true);
      setSelectedVideoPath(customUrl);
      setActiveSection('');
    }
  };

  const handleMusicSubmit = (e) => {
    e.preventDefault();
    if (musicUrl) {
      setIsPlayingMusic(true);
    }
  };

  return (
    <div className="video-selector-sidebar">
      <div className="sidebar-controls">
        <div className="control-group main-group">
          <div 
            className={`control-item ${activeSection === 'scenes' ? 'active' : ''}`}
            onClick={() => toggleSection('scenes')}
            title="Chọn Không Gian"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>

          <div 
            className={`control-item ${openMood ? 'active' : ''}`}
            onClick={handleMoodClick}
            title="Âm Thanh & Mood"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </div>

          <div 
            className={`control-item ${openFocus ? 'active' : ''}`}
            onClick={handleFocusClick}
            title="Hẹn Giờ Tập Trung"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
        </div>

        <div className="control-group bottom-group">
          {/* Music Icon */}
          <div 
            className={`nav-item ${activeSection === 'music' ? 'active' : ''}`}
            onClick={() => toggleSection('music')}
            title="Nhạc"
          >
            <div className="icon">🎵</div>
          </div>

          {/* Tools Icon (New) */}
          <div 
            className={`nav-item ${activeSection === 'tools' ? 'active' : ''}`}
            onClick={() => toggleSection('tools')}
            title="Công cụ"
          >
            <div className="icon">🛠️</div>
          </div>

          {/* Settings Icon */}
          <div 
            className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => toggleSection('settings')}
            title="Cài Đặt"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Panels */}
      {activeSection === 'scenes' && (
        <div className="selector-panel scenes-panel">
          <div className="panel-header">
            <h3>Không Gian</h3>
            <button className="close-btn" onClick={() => setActiveSection('')}>×</button>
          </div>

          <div className="scenes-content-scroll">
            <div className="scene-category">
              <h4>Mặc Định</h4>
              <div className="scenes-grid">
                {scenes.map((scene, index) => (
                  <div 
                    key={index} 
                    className="scene-card"
                    onClick={() => handleSceneSelect(scene)}
                  >
                    <span className="scene-icon">{scene.icon}</span>
                    <span className="scene-name">{scene.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {extraScenes.map((category, catIndex) => (
              <div key={catIndex} className="scene-category">
                <h4>{category.category}</h4>
                <div className="scenes-grid extra-grid">
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className="scene-card extra-card"
                      onClick={() => handleExtraSceneSelect(item.video)}
                    >
                      <div className="scene-thumb">
                        <img src={item.thumb} alt={item.name} loading="lazy" />
                      </div>
                      <span className="scene-name">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="custom-video-section">
              <h4>Video Tùy Chỉnh</h4>
              <form onSubmit={handleCustomSubmit} className="custom-video-form">
                <input 
                  type="text" 
                  placeholder="Dán link video..." 
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
                <button type="submit">GO</button>
              </form>
              <p className="panel-desc">Hỗ trợ link .mp4 trực tiếp</p>
            </div>
          </div>
        </div>
      )}

      {/* Music Panel */}
      {activeSection === 'music' && (
        <div className="selector-panel music-panel">
          <div className="panel-header">
            <h3>Âm Nhạc</h3>
            <button className="close-btn" onClick={() => setActiveSection('')}>×</button>
          </div>
          
          <div className="music-content">
            <div className="music-section">
              <h4>Playlist Có Sẵn</h4>
              <div className="playlist-buttons">
                <button className="playlist-btn chill" onClick={() => dispatch(setMood('chill'))}>
                  ☕ Chill
                </button>
                <button className="playlist-btn jazzy" onClick={() => dispatch(setMood('jazzy'))}>
                  🎷 Jazzy
                </button>
                <button className="playlist-btn sleep" onClick={() => dispatch(setMood('sleep'))}>
                  🌙 Sleep
                </button>
              </div>
            </div>

            <div className="music-section">
              <h4>Nhạc Tùy Chỉnh</h4>
              <form onSubmit={handleMusicSubmit} className="custom-music-form">
                <input 
                  type="text" 
                  placeholder="Link Youtube/SoundCloud..." 
                  value={musicUrl}
                  onChange={(e) => setMusicUrl(e.target.value)}
                />
                <button type="submit">Phát</button>
              </form>
            </div>
            
            {isPlayingMusic && (
              <div className="now-playing-control">
                <div className="volume-control">
                  <label>Âm lượng:</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1" 
                    value={musicVolume}
                    onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  />
                </div>
                <button className="stop-music-btn" onClick={() => setIsPlayingMusic(false)}>
                  Dừng nhạc
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tools Panel (New) */}
      {activeSection === 'tools' && (
        <div className="selector-panel tools-panel">
          <div className="panel-header">
            <h3>Công Cụ</h3>
            <button className="close-btn" onClick={() => setActiveSection('')}>×</button>
          </div>
          
          <div className="tools-tabs">
            <button 
              className={`tab-btn ${activeToolTab === 'todo' ? 'active' : ''}`}
              onClick={() => setActiveToolTab('todo')}
            >
              📝 Việc Cần Làm
            </button>
            <button 
              className={`tab-btn ${activeToolTab === 'pdf' ? 'active' : ''}`}
              onClick={() => setActiveToolTab('pdf')}
            >
              📄 Đọc PDF
            </button>
          </div>

          <div className="tools-content">
            {activeToolTab === 'todo' ? (
              <div className="todo-wrapper">
                <TodoList />
              </div>
            ) : (
              <div className="pdf-wrapper">
                <PDFSelector onSelectPDF={setPdfFile} />
              </div>
            )}
          </div>
        </div>
      )}

      {activeSection === 'settings' && (
        <div className="selector-panel settings-panel">
          <div className="panel-header">
            <h3>Cài Đặt</h3>
            <button className="close-btn" onClick={() => setActiveSection('')}>×</button>
          </div>
          
          <div className="settings-list">
            <div className="setting-item" onClick={() => {
              dispatch(toggleAutoTheme(!autoTheme));
              if (!autoTheme) dispatch(applyScheduledTheme());
            }}>
              <div className="setting-info">
                <span className="setting-icon">⚙️</span>
                <span>Tự động theo giờ</span>
                <span className="setting-subtext">(06:00 - 18:00)</span>
              </div>
              <div className={`toggle-switch ${autoTheme ? 'on' : ''}`}></div>
            </div>

            <div className={`setting-item ${autoTheme ? 'disabled' : ''}`} onClick={() => !autoTheme && dispatch(changeDayNight(mode))}>
              <div className="setting-info">
                <span className="setting-icon">{mode === 'day' ? '☀️' : '🌙'}</span>
                <span>Giao diện {mode === 'day' ? 'Ngày' : 'Đêm'}</span>
              </div>
              <div className={`toggle-switch ${mode === 'day' ? 'on' : ''}`}></div>
            </div>

            <div className="divider"></div>

            {user ? (
              <div className="user-section">
                <div className="user-info">
                  <img src={user.photoURL} alt="Avatar" className="user-avatar" />
                  <span className="user-name">{user.displayName}</span>
                </div>
                <button className="auth-btn logout" onClick={() => dispatch(signOutAPI())}>
                  Đăng Xuất
                </button>
              </div>
            ) : (
              <button className="auth-btn login" onClick={() => dispatch(signInAPI())}>
                Đăng Nhập với Google
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hidden Player for Custom Music */}
      <div className="hidden-player">
        <ReactPlayer 
          url={musicUrl}
          playing={isPlayingMusic}
          volume={musicVolume}
          width="0"
          height="0"
          onEnded={() => setIsPlayingMusic(false)}
          onError={() => alert('Lỗi phát nhạc. Vui lòng kiểm tra link.')}
        />
      </div>
    </div>
  );
};

export default VideoSelector;
