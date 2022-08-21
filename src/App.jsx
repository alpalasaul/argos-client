import Navbar from './components/Navbar' 
import ListFrame from './components/ListFrames' 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SharedLayout from './components/SharedLayout'
import Streaming from './components/Streaming'

function App() {

  return (
    <div className="container mx-auto mt-5">

      <BrowserRouter>
        <Routes>

          <Route path='/' element={<SharedLayout/>}>
          <Route index element={<Home/>}/>
            <Route path='videos' element={<ListFrame/>}/>
            <Route path='streaming' element={<Streaming/>}/>
            <Route path='about' element={<div>About</div>}/>
          </Route>
        
        </Routes>        
      </BrowserRouter>

    </div>
  )
}

export default App
