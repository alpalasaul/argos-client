import { useEffect, useState } from "react"
import test from "./../assets/Modelos-de-moto.png"  
import Frame from "./Frame"
import axios from "axios"

const Video = ({ socket }) => {

    const [frame, setFrame] = useState("")
    const [image, setImage] = useState("")
    const [data, setData] = useState([])

    // useEffect(() => {
    //   setInterval(() => {
    //     console.log('Prueba')
    //     socket.emit('test', {frame: 'Enviando petición desde el front'})
    //     socket.on('response-frames', (response) => {
    //       const { data } = response
    //       // console.log(data)
    //       // console.log('first')
    //       setFrame(Math.random()) // Aquí va el arreglo de bytes

    //       // showImage(data)
    //     })
    //   }, 5000); // ajustar para recibir más rápido los mensajes
    // }, []);

    // const showImage = (buffer) => {
    //   // there is no buffer.data here
    //   const blob = new Blob( [ buffer ] );
    //   const url = URL.createObjectURL( blob );
    //   const img = document.getElementById( 'img' );
    //   img.src = url;
    //   // So the Blob can be Garbage Collected
    //   img.onload = e => URL.revokeObjectURL( url );
    //   // ... do something else with 'buffer'



    //   // fetch( 'https://picsum.photos/200/300' )
    //   // .then( r => r.arrayBuffer() )
    //   // .then( buffer => { // note this is already an ArrayBuffer
    //   //   // there is no buffer.data here
    //   //   const blob = new Blob( [ buffer ] );
    //   //   const url = URL.createObjectURL( blob );
    //   //   const img = document.getElementById( 'img' );
    //   //   img.src = url;
    //   //   // So the Blob can be Garbage Collected
    //   //   img.onload = e => URL.revokeObjectURL( url );
    //   //   // ... do something else with 'buffer'
    //   // } );


    // }

    const getData = async () => {
        const URL = "https://www.googleapis.com/drive/v3/files/?q='1bjr3CZjwzYsEGYupNnnsW8_YMFuIMRl-' in parents"
        const TOKEN = "ya29.A0AVA9y1un0U4B7EueilAmftMNafz7w_XhHEBzCe6m5ZWn9y2uUHo8cXLJTKkdKRPLq3EMJpgU6aPp6zF_eYWQ4K19LGH74rqbiig3qsTCSAhCfxXST_Aj2FG3TNZpDIlnCdSuqMHe4n2mLHbd_LXKnzQNIfZHaCgYKATASATASFQE65dr8sfCcHZllSd6Iy3HvFYxaww0163"
        const response = await axios.get(URL, {
          headers: {
            'Authorization' : `Bearer ${TOKEN}`
          }
        })
        console.log(response.data.files)
        const files = Object.keys(response.data.files)
        setData(files)
    }

    useEffect(() => {
      try {
        getData()
      } catch (err) {
        // console.log(err)
      }
    }, [])
    
    
  return (
    <div className="flex flex-wrap">
        {/* <img 
          id="img" 
          className="w-1/2 h-1/2" 
          src="https://drive.google.com/uc?export=view&id=11hvBC_sdmZKaBJiyXVF2VXhVzt6uvHyX"
          alt="My image" 
        /> */}

        {
          data.map(frame => 
            <Frame 
            key={ frame.id } 
            id={ frame.id }/>
          )
        }

        {/* <h1>{frame}</h1> */}
        {/* <Frame/> */}
    </div>
  )
}

export default Video