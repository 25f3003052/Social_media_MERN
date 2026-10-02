import {BrowserRouter , Routes , Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'


function App() {

  return (
    <>
       <BrowserRouter>
       
       <Routes>

        <Route path = '/' element = {<Landing />}/>
        <Route path = '/home' element = {<Home />}/>
        <Route path = '/login' element = {<Login />}/>
        <Route path = '/signup' element = {<Signup />}/>



       </Routes >
       
       </BrowserRouter>
    </>
  )
}

export default App
