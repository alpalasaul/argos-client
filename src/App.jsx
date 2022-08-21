import Header from './components/Header' 
import Video from './components/Video' 
import io from "socket.io-client"

// const socket = io.connect('http://localhost:5000', {
// const socket = io.connect('http://4e64-34-68-118-243.ngrok.io/', {
// const socket = io.connect('https://3ccf-45-186-6-127.sa.ngrok.io/', {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }, 
//   // transports: ['websocket'],
// })

function App() {

  return (
    <div className="container mx-auto mt-20">
      <Header/>
      <div className='mt-5'>
        {/* <Video socket={ socket }/> */}
        <Video/>
      </div>
    </div>
  )
}

export default App
