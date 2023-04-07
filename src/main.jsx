import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home/Home'
import Error from '../src/pages/Error/Error'
import SignIn from './pages/SignIn/SignIn'
import Registration from './pages/Registration/Registration'
import Navbar from './components/Navbar/Navbar'
import './index.css'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/*' element={<Error/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<SignIn/>} />
        <Route path='/registration' element={<Registration/>} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));