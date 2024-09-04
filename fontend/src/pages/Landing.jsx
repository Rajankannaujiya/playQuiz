
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import LandingComp from '../components/LandingComp.jsx'

import { isAuthenticated } from '../recoil.js'
import Appbar from './Appbar.jsx'

function Landing() {

  const authenticate = useRecoilValue(isAuthenticated)

  if(!authenticate){  
    return (
      <div>Login to proceed <Link to={"/"} className='font-bold text-md underline'>Signup</Link></div>
    )
  }
  return (
   authenticate && <div className='w-full'>
    <Appbar />
        <LandingComp />
    </div>
  )
}

export default Landing