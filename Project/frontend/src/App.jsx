import Home from './Components/Home'
import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';



function App() {

  return (

    <>
      <ToastContainer />
      <Home />
      <main>
        <Outlet />

      </main>
    </>

  )
}

export default App
