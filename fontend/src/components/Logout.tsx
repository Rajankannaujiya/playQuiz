import { useNavigate } from "react-router-dom"
import Button from "./Button.jsx"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import Alert from "./Alert.jsx"
import { useSetRecoilState } from "recoil"
import { isSignin } from "../recoil.js"
import React from "react"



function Logout() {

    const navigate =useNavigate()
    const setIsSignin = useSetRecoilState(isSignin)
    const [isClicked, setIsClicked] =useState(false)

   async function handleLogout(){
        setIsClicked(true);

       try {
        
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/logout`,{
            headers:{
                'Authorization':`${localStorage.getItem("token")}`
            }
        })
        
        if(response){
            localStorage.removeItem('token');
            setIsSignin(false)
            navigate('/', { replace: true });
            
        }

       } catch (error) {
        
        <Alert textColor="text-red-800" alertType="Danger Alert!" alertContent="error while logout please try again later"/>
       }

       finally{
        setIsClicked(false)
       }
    }

  return (
    <div>
        <Button type={"button" } onClick={handleLogout} buttonFor={"Logout"} colour={"bg-gray-800"} isClicked={isClicked}/>
    </div>
  )
}

export default Logout