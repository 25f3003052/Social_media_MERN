import {BrowserRouter , Routes , Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthProviders } from './context/AuthContext'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

  return (
    <>
    <AuthProviders>
       <BrowserRouter>
       
       <Routes>

        <Route path = '/' element = {<PublicRoute><Landing /></PublicRoute>}/>
        <Route path = '/login' element = {<PublicRoute><Login /></PublicRoute>}/>
        <Route path = '/signup' element = {<PublicRoute><Signup /></PublicRoute>}/>



        <Route path = '/home' element = {<ProtectedRoute><Home /></ProtectedRoute>}/>

       </Routes >
       
       </BrowserRouter>
    </AuthProviders>
    </>
  )
}

export default App
