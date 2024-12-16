import React, { useState, useRef } from 'react';
import { backendUrl } from './constant.js';
import axios from 'axios';
import './uploadVideo.css'; // Import the CSS file

const UploadVideo = () => {
    const videoFile = useRef(null);
    const [error, setError] = useState("");
    const [videoUrl, setVideoUrl] = useState('');
    const [file, setFile] = useState();
    const [title, setTitle] = useState(""); // State for title input
    const [isLoading,setIsLoading]=useState(false);
    const handleChange = (e) => {
        const f = e.target.files[0];
        setFile(f);
        setError('');
        console.log(e.target.files[0]);

        const fileTypes = ['video/mp4', 'video/mkv', 'video/webm', 'video/ogg'];
        if (f?.size > 50 * 1024 * 1024) setError("Size greater than 50 MB is not allowed");
        else if (!fileTypes.includes(f?.type)) setError('File must be a video type');
        setVideoUrl(URL.createObjectURL(f));
    };

    const handleSubmit = async () => {
        if (file && !error && title.trim() !== "") {
            const formData = new FormData();
            formData.append('videoFile', file);
            formData.append('title', title); // Append title to form data

            try {
                setIsLoading(true)

                const res = await axios.post(`${backendUrl}/upload-video`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
             // console.log(res)
                if(res.status===200){
                    alert("Video uploaded successfully");
                }
            } catch (error) {
                setError(error?.response?.data?.message);
                console.log(error);
            }
           finally{
            setIsLoading(false);
           }
        } else if (title.trim() === "") {
            setError("Title is required");
        }
    };

    return (
        <div className="upload-video-container">
            <h1 className="upload-video-header">Upload Video</h1>
            <p className="upload-video-description">Upload a video of less than 50MB</p>

            {/* Title Input */}
            <input 
                type="text" 
                placeholder="Enter video title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="upload-video-title-input"
            />

            {/* Video File Input */}
            <input 
                ref={videoFile} 
                type="file" 
                name="video" 
                id="video" 
                onChange={handleChange} 
                className="upload-video-input"
            />

            {/* Submit Button */}
            {file && !error && (
                <button 
                    onClick={handleSubmit} 
                    className="upload-video-button">
                    Send to backend for processing
                </button>
            )}
            {isLoading && (
                <div className="upload-video-overlay">
                    <div className="upload-video-loader"></div>
                </div>
            )}
            {/* Error Message */}
            {error && <h4 className="upload-video-error">{error}</h4>}

            {/* Video Preview */}
            {file && <video className="upload-video-preview" width={400} src={videoUrl} controls></video>}
        </div>
    );
};

export default UploadVideo;

