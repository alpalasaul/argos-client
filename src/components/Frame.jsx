import { useEffect, useState } from 'react'
// import drive from './../key/drive.js'

const Frame = ({ id }) => {

  const [src, setSrc] = useState("")

  useEffect(() => {
    // drive()  
    setSrc(`https://drive.google.com/file/d/${id}/preview`)
  }, [])
    
  return (
    <iframe 
      src={ src }
      width="512" 
      height="288" 
      allow="autoplay"
    />
  )
}

export default Frame