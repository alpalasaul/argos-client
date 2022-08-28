import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const server = "http://azure/linode/184.123.456-.1"

const Streaming = ({ urlStreaming ,setUrlStreaming }) => {

  const [source, setSource] = useState("")
  const [show, setShow] = useState(false)

  const openStream = async () =>{
    let idStream = source;
    let replace = idStream.replace('https://www.youtube.com/watch?v=', '')
    let split = replace.split('&')
    const urlStreaming = `https://www.youtube.com/embed/${split[0]}?controls=0&autoplay=1` 
    try {
      const response = await axios.get(URL + 'stream', {
        params: {
          stream_url: urlStreaming
        }
      })
      console.log(response.data)
      setShow(true)
      setUrlStreaming(urlStreaming)
    } catch (err) {
      console.log(err.response)
    } finally {
      setShow(false)
      setUrlStreaming("")
    }
  }

  const closeStream = async () => {
    try {
      const response = await axios.get(URL + 'stop')
      console.log(response.data) // crear un componente de mensaje
    } catch(err) {
      console.log(err.response)
    } finally {
      setUrlStreaming("")
      setSource("")
      setShow(false)
    }
  }
  
  return (
    <div>
      <p className="text-3xl mt-5 text-center mb-5 font-bold">
          Capturando {''}
          <span className="text-indigo-600 font-bold uppercase">Live Stream </span>
          desde una cámara IP
      </p>

      <div className="flex justify-center">
        <input 
          id="mascota"
          type="text" 
          placeholder="Enlace al stream de video"
          className="border-2 w-1/3 p-2 placeholder-gray-400 rounded-md text-gray-500"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <button 
          className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ml-2'
          onClick={openStream}
        >
          Iniciar
        </button>

        <button 
          className='bg-gray-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ml-2'
          onClick={closeStream}
        >
          Detener
        </button>
          
      </div>

      { show 
      ?
        <div>
          <div className='flex justify-center mt-5'>
            <iframe 
              width="854" 
              height="480" 
              // src={`https://www.youtube.com/embed/${id}?controls=0&autoplay=1`}
              src={ urlStreaming }
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
          <div className="flex justify-center mt-5">
            <div className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ml-2">
              <Link to="/videos">Ver detecciones de casco</Link>
            </div>
          </div>

        </div>
      :
      <div>
        <p className="text-lg mt-5 text-center mb-5">
          Ingresa un enlace para comenzar a  {''}
          <span className="text-indigo-600 font-bold"> capturar {''}</span>
          el stream y mandarlos al modelo de machine learning.
        </p>
      </div>
      
      }
      
    </div>
  )
}

export default Streaming