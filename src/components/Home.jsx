import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Hero from './../assets/hero.png'

const Home = () => {
  return (
    <>
      <Navbar/>
      
      <h3>testS</h3>

      <section>
          <Outlet/>
      </section>
    </>
  )
}

export default Home