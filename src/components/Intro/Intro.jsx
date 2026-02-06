import React, { useEffect, useState } from 'react';
import './Intro.scss';

const Intro = ({ onFinish, minDuration = 1500, autoClose = true, videoSrc = '/video/autumn-bedroom-moewalls-com.mp4' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf;
    let start;
    const duration = Math.max(minDuration, 1500);

    const step = (ts) => {
      if (!start) start = ts;
      const pct = Math.min(((ts - start) / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [minDuration]);

  useEffect(() => {
    if (autoClose && progress >= 100) {
      const t = setTimeout(() => onFinish && onFinish(), 300);
      return () => clearTimeout(t);
    }
  }, [progress, autoClose, onFinish]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onFinish && onFinish();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onFinish]);

  return (
    <div className="intro__backdrop" role="dialog" aria-modal="true" aria-label="Trang giới thiệu">
      <video
        className="intro__video"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="intro__overlay" />
      <button className="intro__skip" onClick={() => onFinish && onFinish()} aria-label="Bỏ qua intro">Bỏ qua</button>
      <div className="intro__card">
        <img
          className="intro__logo"
          src="/assets/icons/lofi-logo.gif"
          alt="Lofi Chill Study logo"
          draggable="false"
        />
        <h1 className="intro__title">Lofi Chill Study</h1>
        <p className="intro__subtitle">Tập trung. Thư giãn. Học hiệu quả.</p>

        <div className="intro__progress" aria-label="Đang tải">
          <div className="intro__progress-bar" style={{ width: `${progress}%` }} />
          <div className="intro__progress-label" aria-live="polite">
            {Math.round(progress)}%
          </div>
        </div>

        <button
          className="intro__enter"
          onClick={() => onFinish && onFinish()}
          title="Nhấn Enter/Space để vào"
          aria-label="Vào ngay"
        >
          Vào ngay
        </button>
        <div className="intro__hint">Nhấn Enter hoặc Space để vào ngay</div>
      </div>

      <div className="intro__bg-blur" />
    </div>
  );
};

export default Intro;
