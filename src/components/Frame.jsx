import { useEffect, useState } from 'react'

const Frame = ({ frame }) => {

  const [src, setSrc] = useState("")

  const { id, createdTime, name, size, modifiedTime } = frame

  useEffect(() => {
    setSrc(`https://drive.google.com/file/d/${id}/preview`)
  }, [])

  const formatDate = (createdTime) => {
    return createdTime.split('T')[0]
  }
    
  return (
    <div className='bg-white shadow-md rounded-lg py-5 px-5 text-center mx-2 my-2 text-gray-500'>
      <div className='flex justify-between'>
        <p className='uppercase'>{ name.replace('.mp4', '') }</p>
        <p>{ formatDate(createdTime) }</p>
      </div>

      <iframe 
        className='mx-3 my-3 rounded-lg'
        src={ src }
        width="384" 
        height="216" 
        allow="autoplay"
      />
      <button className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>
        Ver en pantalla completa
      </button>
    </div>
  )
}

export default Frame