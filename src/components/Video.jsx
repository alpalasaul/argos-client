import { useEffect, useState } from "react"
import Frame from "./Frame"
import axios from "axios"

const Video = () => {

    const [data, setData] = useState([])

    const getData = async () => {
      const URL = "https://www.googleapis.com/drive/v3/files/?q='1bjr3CZjwzYsEGYupNnnsW8_YMFuIMRl-' in parents"
      const TOKEN = "ya29.A0AVA9y1un0U4B7EueilAmftMNafz7w_XhHEBzCe6m5ZWn9y2uUHo8cXLJTKkdKRPLq3EMJpgU6aPp6zF_eYWQ4K19LGH74rqbiig3qsTCSAhCfxXST_Aj2FG3TNZpDIlnCdSuqMHe4n2mLHbd_LXKnzQNIfZHaCgYKATASATASFQE65dr8sfCcHZllSd6Iy3HvFYxaww0163"
      try {
        const response = await axios.get(URL, {
          headers: {
            'Authorization' : `Bearer ${TOKEN}`
          }
        })
        setData(response.data.files)
      } catch(err) {
        console.log(err.response)
      }
    }

    useEffect(() => {
      getData()
    }, [])
    
  return (
    <div className="flex flex-wrap">
      {
        data.map(frame => 
          <Frame 
          key={ frame.id } 
          id={ frame.id }/>
        )
      }
    </div>
  )
}

export default Video