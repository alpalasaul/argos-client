import ListFrame from './components/ListFrames' 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SharedLayout from './components/SharedLayout'
import Streaming from './components/Streaming'
import About from './pages/About'
import { useState } from 'react'

function App() {

  const [urlStreaming, setUrlStreaming] = useState("")

  return (
    <div className="container mx-auto mt-5">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SharedLayout/>}>
          <Route index element={<Home/>}/>
            <Route path='videos' element={<ListFrame/>}/>
            <Route path='streaming' element={<Streaming urlStreaming={ urlStreaming } setUrlStreaming= { setUrlStreaming }/>}/>
            <Route path='about' element={<About/>}/>
          </Route>
        </Routes>        
      </BrowserRouter>

    </div>
  )
}

export default App
