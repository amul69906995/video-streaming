import React, { useState } from 'react'
import { useRef } from 'react'
import { backendUrl } from './constant.js';
import axios from 'axios'

const UploadVideo = () => {
    const videoFile = useRef(null);
    const [error, setError] = useState("")
    const [videoUrl, setVideoUrl] = useState('');
    const [file, setFile] = useState()
    const handleChange = (e) => {
        const f = e.target.files[0];
        setFile(f)
        setError('')
        console.log(e.target.files[0])
       
        
        const fileTypes = ['video/mp4', 'video/mkv', 'video/webm', 'video/ogg'];
        if (f?.size > 50 * 1024 * 1024) setError("size greater than 50 MB is not allowed")
        else if (!fileTypes.includes(f?.type)) setError('file must be a video type')
        setVideoUrl(URL.createObjectURL(f))
    }

    const handleSubmit = async() => {
        if (file && !error) {
            const formData = new FormData();
            formData.append('videoFile', file)
            // to see formData else if u directly console like console.log(formData) u will see nothing
            // for (let [key, value] of formData.entries()) {
            //     console.log(key, value);
            // }
            try {

                const {data}=await axios.post(`${backendUrl}/upload-video`,formData,{
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  })

                  console.log(data)
            } catch (error) {
                setError(error?.response?.data?.message);
                console.log(error);
            }
        }
    }

    return (
        <>
            <h1>upload video</h1>
            <p>upload video of less than 50MB</p>
            <input ref={videoFile} type="file" name="video" id="video" onChange={handleChange} />
           {file&&!error && <button onClick={handleSubmit}>send to backend for processing</button>}
            {error && <h4>{error}</h4>}
            <video width={400} src={videoUrl}></video>
        </>
    )
}


export default UploadVideo;
