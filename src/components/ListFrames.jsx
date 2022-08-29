import { useEffect, useState } from "react"
import Frame from "./Frame"
import listObjectsBucket from './../key/aws-exports.js'

const ListFrames = () => {

  const [numPage, setNumPage] = useState(0)
  const [counter, setCounter] = useState(1)
  const [page, setPage] = useState([])
  const [sheets, setSheets] = useState({})

  useEffect(() => {
    getData()
    // return () => getData

    const interval = setInterval(() => {
      if (counter === 1) {
        getData()
      }
      }, 10000);
      return () => clearInterval(interval);
    }, [])
  
  const getData = async () => {
    const fetchData = await listObjectsBucket()
    const res = fetchData.length / 6
    const numPages = Number.isInteger(res) ? res : parseInt(res) + 1
    setNumPage(numPages)
    const paginador = paginator(numPages, fetchData)
    setSheets(paginador)
    setPage(paginador[counter])
  }

  const nextPage = () => {
    if (counter < numPage) {
      setCounter(counter + 1) 
      setPage(sheets[counter + 1])
    }
  }

  const previusPage = () => {
    if (counter > 1) {
      setCounter(counter - 1) 
      setPage(sheets[counter - 1])
    }
  }

  const paginator = (numPages, fetchData) => {
    let pagin = {}
    for (let i = 0; i < numPages; i++) {
      pagin[i+1] = fetchData.slice(6 * i, 6 * (i + 1))
    }
    return pagin
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
          onClick={previusPage}
        >
          Página anterior
        </button>

        <span className="bg-white text-gray-500 font-bold py-2 px-4 rounded">
          Página: { counter }
        </span>

        <button 
          className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded' 
          onClick={nextPage}
        >
          Página siguiente
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        { page && page.length
        ?
          page.map(bucket => 
            <Frame 
            key={ bucket.id } 
            bucket={ bucket }/>
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