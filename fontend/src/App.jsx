
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Signin from './pages/Signin.jsx'
import Landing from './pages/Landing.jsx'
import { RecoilRoot } from 'recoil'



function App() {

  return (
<RecoilRoot>
  <BrowserRouter >
  <Routes >
      <Route path='/' element={<Signup />}/>
      <Route path='/login' element={<Signin/>}/>
      <Route path='/landing' element={<Landing />} />
  </Routes>
  </BrowserRouter>
  </RecoilRoot>
  )
}

export default App
