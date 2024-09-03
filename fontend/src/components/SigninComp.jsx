
import Button from "./Button.jsx"
import Header from "./Header.jsx"
import Input from "./Input.jsx"
import Label from "./Label.jsx"
import axios from "axios"
import { BACKEND_URL } from "../BackendUrl.js"
import { useNavigate } from "react-router-dom"
import Alert from "./Alert.jsx"
import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { isSigninStatus } from "../recoil.js"


function Signincomp() {

  const navigate =useNavigate()
  const setSignInStatus = useSetRecoilState(isSigninStatus)

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  console.log(user)
  const handleChange = (e) => {
    setUser((previous) => ({
      ...previous, // Spread the previous state
      [e.target.name]: e.target.value // Dynamically update the key
    }));
  };


  const [isClicked, setIsClicked] = useState(false)

 async function handleSignInInput(){
  setIsClicked(true)
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, user,{
      headers:{
        "Content-Type":"application/json"
      }
    });
    console.log("this is data", response.data.jwt);

    // Store the token in localStorage
    if(!response.data.jwt){

      <Alert textColor="text-red-800" alertType="Danger Alert!" alertContent="you are not logged in"/>
  
        return;
    }
    localStorage.clear();
    localStorage.setItem("token", response.data.jwt);
    setSignInStatus(true);
    <Alert textColor="text-green-800" alertType="success!" alertContent="you are logged in successfully"/>
    navigate("/landing");
  } catch (error) {
    console.log("an error has been occur while sigin",error);
    <Alert textColor="text-red-800" alertType="Danger Alert!" alertContent="error while signing up please try again later"/>
  }

  finally{
    setIsClicked(false)
  }

  }

  return (
    <div className="h-screen flex justify-center items-center">
           <div className="flex justify-between max-w-md w-full flex-col p-2 ">
      <div className="m-1 p-1">
          <Header mainHeader="Login to your Account" subHeader="Don't have an Account?" linkto="/" linkfor="Signup"/>
        </div>

        <div>
          <Label htmlFor="email"  label="Email"/>
            <Input type="email"  name={"email"} placeholder="Enter your email" value={user.email} onChange={handleChange}/>
        </div>

        <div>
          <Label htmlFor="password"  label="Password"/>
            <Input type="password"  name={"password"} placeholder="Enter your password" value={user.password} onChange={handleChange}/>
        </div>

        <div className="flex justify-center m-4 p-2">
        <Button onClick={handleSignInInput} type="button" buttonFor="Login" colour="gray" isClicked={isClicked}/>
        </div>
    </div>

    </div>
  )
}

export default Signincomp