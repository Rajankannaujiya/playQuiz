import Button from "../components/Button"



function Appbar() {

    function handleLogout(){
        console.log("logout")
    }
  return (
    <div className="fixed top-0 right-0 w-full bg-blue-500 p-4 z-50">
    <div className="flex justify-end m-0 p-0">
    <Button onClick={handleLogout}  buttonFor={"Logout"}  colour={"bg-green-800"}  isClicked={false}/>
    </div>
  </div>
  )
}

export default Appbar