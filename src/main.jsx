import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home/Home'
import Error from '../src/pages/Error/Error'
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import './index.css'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer />
    <Navbar/>
      <Routes>
        <Route path='/*' element={<Error/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/registration' element={<Registration/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));