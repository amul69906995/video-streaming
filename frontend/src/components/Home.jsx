import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from './constant.js';
import VideoPlayer from './VideoPlayer.jsx';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchAllVideos = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/all-video`);
      setVideos(data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      console.log(err);
      setLoading(false); // Ensure loading is set to false even if error occurs
    }
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  return (
    <>
      <h1>Home page where all videos will be shown</h1>
      {loading ? ( // Show loading indicator
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {videos.length > 0 ? (
            videos.map(video => (
              <VideoPlayer 
                key={video._id} 
                title={video.title} 
                originalUrl={video.originalUrl} 
                thumbnail={video.thumbnail}
              />
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      )}
    </>
  );
};

export default Home;


