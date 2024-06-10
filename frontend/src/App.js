import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import {ToastContainer} from 'react-toastify'

const App = () => {
  return (
    <>
    <Header/>
    <main className='py-3'>
      <Container>
<Outlet/> 
   </Container>
    <Footer/>
    <ToastContainer/>
    </main>   
    </>
  )
}

export default App