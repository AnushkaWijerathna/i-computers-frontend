//React website eke pennanne meka... api hadna hama functional folder ekkma mekta connect wenna one
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import AdminPage from './pages/adminPage'
import { Toaster } from 'react-hot-toast';

//Meka thama web site eka...main eke call krnwa
function App() {
  return(
    //enables routing..."Routes" is a dynamic component, enable routing (Athule thiyna ewa isthira na, path eka anuwa change wenwa, *--> "admin/ "mnwa thbbth admin 
    // page eka athulema ee pages load wenna, Toaster-->popup messages display krnna)
     
    <BrowserRouter>
      <Toaster position='top-right'/>
      <div className='w-full h-screen bg-primary text-secondary'>
        <Routes path="/">
          <Route path='/*' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/admin/*' element={<AdminPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
