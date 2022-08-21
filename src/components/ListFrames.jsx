import { useEffect, useState } from "react"
import Frame from "./Frame"
import axios from "axios"
import generateToken from "./../key/token.js"

const ListFrames = () => {

    const [data, setData] = useState([])
    const [nextToken, setNextToken] = useState("")

    const getData = async (size = 6, nextPage = "") => {

      let URL = `https://www.googleapis.com/drive/v3/files/?q='1bjr3CZjwzYsEGYupNnnsW8_YMFuIMRl-' in parents&pageSize=${size}&orderBy=folder,createdTime desc,name&fields=nextPageToken,files(id,name,createdTime,modifiedTime,size)`

      if (nextPage !== "") URL = URL + "&pageToken=" + nextPage
      
      const access_token = await generateToken
      try {
        const response = await axios.get(URL, {
          headers: {
            'Authorization' : `Bearer ${access_token}`
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
      getData(size, nextToken)
    }

    const home = async () => {
      setNextToken("")
      getData()
    }
    
  return (
    <div>
      <div>
        <p className="text-lg mt-5 text-center mb-5">
          Todos los videos {''}
          <span className="text-indigo-600 font-bold">predecidos por el modelo {''}</span>
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
        <button 
          className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'
          onClick={loadVideos}
        >
          Cargar más videos
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {
          data.map(frame => 
            <Frame 
            key={ frame.id } 
            frame={ frame }/>
          )
        }
      </div>
    </div>
  )
}

export default ListFrames