import React from 'react'

const Streaming = () => {
  return (
    <div>
      <p className="text-lg mt-5 text-center mb-5">
          Capturando Live Strem desde {''}
          <span className="text-indigo-600 font-bold uppercase">camara IP</span>
      </p>
      <div className='flex justify-center'>
        <iframe 
          width="854" 
          height="480" 
          src="https://www.youtube.com/embed/36YnV9STBqc?controls=0&autoplay=1" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        />
      </div>
    </div>
  )
}

export default Streaming