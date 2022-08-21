import Navbar from './components/Navbar' 
import ListFrame from './components/ListFrames' 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'

function App() {

  return (
    <div className="container mx-auto mt-5">

      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home/>}>
            <Route path='videos' element={<ListFrame/>}/>
            <Route path='streaming' element={<div>See streaming</div>}/>
            <Route path='about' element={<div>About</div>}/>
          </Route>
        
        </Routes>        
      </BrowserRouter>

    </div>
  )
}

export default App
