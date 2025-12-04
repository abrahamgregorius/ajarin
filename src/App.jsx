
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  const paths = [
    {
      path: "/",
      element: <Home></Home>
    },
    {
      path: "/discover",
      element: <Home></Home>
    },
    {
      path: "/subscription",
      element: <Home></Home>
    },
    {
      path: "/profile",
      element: <Home></Home>
    },
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
