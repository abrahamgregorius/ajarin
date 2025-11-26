import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  const paths = [
    {
      path: "/",
      element: <Home></Home>
    }
  ]

  return (
    <>
      <Routes>
        <Route path='/home' element={<Home></Home>}></Route>
        {paths.map((path, id) => (
          <Route path={path.path} element={path.element} key={id}></Route>
        ))}

      </Routes>
    </>
  )
}

export default App
