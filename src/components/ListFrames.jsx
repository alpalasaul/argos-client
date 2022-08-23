import { useEffect, useState } from "react"
import Frame from "./Frame"
import axios from "axios"
import generateToken from "./../key/token.js"

const ListFrames = () => {

    const [data, setData] = useState([])
    const [nextToken, setNextToken] = useState("")
    const [counter, setCounter] = useState(1)
    
    const URL = `https://www.googleapis.com/drive/v3/files`
    
    const getData = async (size = 6, nextPage = "") => {

      const access_token = await generateToken
      try {
        const response = await axios.get(URL, {
          headers: {
            'Authorization' : `Bearer ${access_token}`
          }, 
          params: {
            q: "'1bjr3CZjwzYsEGYupNnnsW8_YMFuIMRl-' in parents",
            pageSize: size,
            orderBy: "folder,createdTime desc,name",
            fields: "nextPageToken,files(id,name,createdTime,modifiedTime,size)",
            pageToken: nextPage !== "" ? nextPage : ""
          },
          paramsSerializer: (params) => {
            let result = '';
            Object.keys(params).forEach(key => {
                result += `${key}=${encodeURIComponent(params[key])}&`;
            });
            return result.substring(0, result.length - 1);
          }
        })
        setData(response.data.files)
        setNextToken(response.data.nextPageToken)
      } catch(err) {
        console.log(err.response)
      }
    }

    useEffect(() => {
      getData()
    }, [])

    const loadVideos = async () => {
      const size = 6
      if (nextToken !== undefined) {
        getData(size, nextToken)
        setCounter(counter + 1)
      }
    }

    const home = async () => {
      setNextToken("")
      getData()
      setCounter(1)
    }
    
  return (
    <div>
      <div>
        <p className="text-3xl mt-5 text-center mb-5 font-bold">
          Todos los objetos {''}
          <span className="text-indigo-600 font-bold">detectados por el modelo {''}</span>
          aparecerán aquí 🕵🏻
        </p>
      </div>
      <div className="flex justify-around mb-5">
        <button 
          className='bg-white hover:bg-gray-400 hover:text-white text-gray-500 font-bold py-2 px-4 rounded'
          onClick={home}
        >
          Regresar al inicio
        </button>
        <span className="bg-white text-gray-500 font-bold py-2 px-4 rounded">
          Página: { counter }
        </span>
        <button 
          className={nextToken !== undefined 
            ? 
            'bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded' 
            : 
            'bg-indigo-800 text-white font-bold py-2 px-4 rounded'}
          onClick={loadVideos}
          disabled={nextToken === undefined}
        >
          {nextToken !== undefined ? "Cargar más videos" : "No hay más por aquí"}
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        { data && data.length
        ?
          data.map(frame => 
            <Frame 
            key={ frame.id } 
            frame={ frame }/>
          )
        :
          <div>
            <p className="text-lg mt-5 text-center mb-5">
              No hay videos para mostrar, carga un {''}
              <span className="text-indigo-600 font-bold"> Live Stream {''}</span>
              y aparecerán aquí.
            </p>
          </div>
        }
      </div>
    </div>
  )
}

export default ListFrames