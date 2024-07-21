import React, { useRef, useState, useEffect } from 'react';

const videos = [
  {
    title: "Video 1",
    source: "https://www.w3schools.com/html/mov_bbb.mp4",
    image: "https://via.placeholder.com/248x248.png?text=Video+1",
  },
  {
    title: "Video 2",
    source: "https://www.w3schools.com/html/movie.mp4",
    image: "https://via.placeholder.com/248x248.png?text=Video+2",
  },
  // Add more videos as needed
];

const VideoPlayer = () => {
  const videoElement = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const [volumePercentage, setVolumePercentage] = useState(75);
  const [playbackRate, setPlaybackRate] = useState(1);

  const handleClickBackward = () => {
    setCurrentPlayer((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleClickForward = () => {
    setCurrentPlayer((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isPlaying) {
      videoElement.current.play();
    } else {
      videoElement.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoElement.current;

    const updateDuration = () => {
      setDuration(video.duration);
    };

    const updateCurrentTime = () => {
      setTrackProgress(video.currentTime);
    };

    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('timeupdate', updateCurrentTime);

    video.load();
    if (isPlaying) {
      video.play().catch((error) => {
        console.error("Failed to play video:", error);
      });
    }

    return () => {
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, [currentPlayer, isPlaying]);

  const progressBarWidth = duration ? (trackProgress / duration) * 100 : 0;

  const handleClickMute = () => {
    videoElement.current.muted = !isMute;
    setIsMute(!isMute);
  };

  const changePlaybackRate = (rate) => {
    videoElement.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  useEffect(()=>{
    const handleKeyDown=(e)=>{
   if(e.keyCode===39){
    videoElement.current.currentTime += 2;
   }
   if(e.keyCode===37){
    videoElement.current.currentTime -= 2;  }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[])

  return (
    <>
      <h1>{videos[currentPlayer].title}</h1>
      <h4>{Math.floor(trackProgress)} / {Math.floor(duration)} seconds</h4>
      <img src={videos[currentPlayer].image} alt={videos[currentPlayer].title} />
      <div>
        <button onClick={handleClickBackward}>Previous</button>
        <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={handleClickForward}>Next</button>
      </div>
      
      <video  ref={videoElement} src={videos[currentPlayer].source} width="600"></video>
      <div>
        <button onClick={handleClickMute}>{isMute ? "Unmute" : "Mute"}</button>
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
        />
      </div>
      <div style={{ height: '15px', width: '100%', border: '2px solid blue', borderRadius: '10px', marginTop: '10px', position: 'relative' }}>
        <div style={{ backgroundColor: 'red', width: `${progressBarWidth}%`, height: '100%' }}></div>
      </div>
      <input
        type="range"
        min="0"
        max={duration}
        value={trackProgress}
        onChange={(e) => {
          const newTime = parseFloat(e.target.value);
          setTrackProgress(newTime);
          videoElement.current.currentTime = newTime;
        }}
      />
      <div>
        <label>Speed: </label>
        <button onClick={() => changePlaybackRate(1)}>1x</button>
        <button onClick={() => changePlaybackRate(1.5)}>1.5x</button>
        <button onClick={() => changePlaybackRate(2)}>2x</button>
        <button onClick={() => changePlaybackRate(3)}>3x</button>
        <span>{playbackRate}x</span>
      </div>
      <div>
        <button onKeyDown={(e)=>handleKeyDown(e)}>Skip Backward 2s</button>
        <button onKeyDown={(e)=>handleKeyDown(e)}>Skip Forward 2s</button>
      </div>
    </>
  );
};

export default VideoPlayer;