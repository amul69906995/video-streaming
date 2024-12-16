import React, { useRef, useState, useEffect } from 'react';

const VideoPlayer = ({ title, originalUrl, thumbnail }) => {
  const videoElement = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const [volumePercentage, setVolumePercentage] = useState(75);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedModal, setShowSpeedModal] = useState(false);
console.log(originalUrl)
  useEffect(() => {
    if (isPlaying) {
      videoElement.current.play();
    } else {
      videoElement.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoElement.current;

    const updateDuration = () => setDuration(video.duration);
    const updateCurrentTime = () => setTrackProgress(video.currentTime);

    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, [isPlaying]);

  const progressBarWidth = duration ? (trackProgress / duration) * 100 : 0;

  const handleClickMute = () => {
    videoElement.current.muted = !isMute;
    setIsMute(!isMute);
  };

  const changePlaybackRate = (rate) => {
    videoElement.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const toggleSpeedModal = () => setShowSpeedModal(!showSpeedModal);

  return (
    <div style={{ border: '1px solid gray', borderRadius: '10px', padding: '10px', width: '300px', position: 'relative' }}>
      <h2>{title}</h2>
      {/* <img src={thumbnail} alt={title} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} /> */}
      
      <video ref={videoElement} src={originalUrl} width="100%" style={{ display: 'block', marginTop: '10px', borderRadius: '10px' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <button onClick={() => setIsPlaying(!isPlaying)} style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <span>{Math.floor(trackProgress)} / {Math.floor(duration)} s</span>
      </div>

      <div style={{ height: '5px', width: '100%', backgroundColor: '#ddd', borderRadius: '5px', marginTop: '10px' }}>
        <div style={{ backgroundColor: 'blue', width: `${progressBarWidth}%`, height: '100%', borderRadius: '5px' }}></div>
      </div>

      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={handleClickMute} style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: isMute ? '#ff4d4d' : '#007bff', color: '#fff' }}>
          {isMute ? 'Unmute' : 'Mute'}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volumePercentage}
          onChange={(e) => {
            const volume = e.target.value;
            setVolumePercentage(volume);
            videoElement.current.volume = volume / 100;
          }}
          style={{ flex: 1, marginLeft: '10px' }}
        />
      </div>

      <div style={{ marginTop: '10px', position: 'relative' }}>
        <button onClick={toggleSpeedModal} style={{ padding: '5px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff' }}>
          Speed: {playbackRate}x
        </button>
        {showSpeedModal && (
          <div style={{ position: 'absolute', top: '100%', left: '0', backgroundColor: '#fff', border: '1px solid gray', borderRadius: '5px', padding: '5px', zIndex: '1000' }}>
            <button onClick={() => changePlaybackRate(1)}>1x</button>
            <button onClick={() => changePlaybackRate(1.5)}>1.5x</button>
            <button onClick={() => changePlaybackRate(2)}>2x</button>
            <button onClick={() => changePlaybackRate(3)}>3x</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
