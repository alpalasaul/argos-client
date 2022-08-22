import { useState } from "react"
import { Link } from "react-router-dom"

const Streaming = () => {

  const [source, setSource] = useState("")
  const [show, setShow] = useState(false)
  const [id, setId] = useState("")

  const openStream = () =>{
    console.log('Streming...')
    let idStream = source;
    let replace = idStream.replace('https://www.youtube.com/watch?v=', '')
    let split = replace.split('&')
    setId(split[0])
    setShow(true)
  }

  return (
    <div>
      <p className="text-lg mt-5 text-center mb-5">
          Capturando Live Strem desde {''}
          <span className="text-indigo-600 font-bold uppercase">camara IP</span>
      </p>

      <div className="flex justify-center">
        <input 
          id="mascota"
          type="text" 
          placeholder="Enlace al stream"
          className="border-2 w-1/3 p-2 placeholder-gray-400 rounded-md"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <button 
          className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ml-2'
          onClick={openStream}
        >
          Ingresar
        </button>
          
      </div>

      { show &&

        <div>
          <div className='flex justify-center mt-5'>
            <iframe 
              width="854" 
              height="480" 
              src={`https://www.youtube.com/embed/${id}?controls=0&autoplay=1`}
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            />
          </div>
          <div className="flex justify-center mt-5">
            <div className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ml-2">
              <Link to="/videos">Ver detecciones de casco</Link>
            </div>
          </div>

        </div>


      }
      
    </div>
  )
}

export default Streaming