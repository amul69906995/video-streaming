import React, { useEffect, useState } from 'react'
import UploadVideo from './components/UploadVideo'
import VideoPlayer from './components/VideoPlayer'
import Home from './components/Home'

const App = () => {

  return (
    <>
      <UploadVideo/>
      {/* <VideoPlayer/> */}
      <Home/>
    </>
  )
}

export default App

