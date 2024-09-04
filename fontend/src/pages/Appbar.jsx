
import Logout from "../components/Logout"



function Appbar() {

  return (
    <div className="fixed top-0 right-0 w-full bg-blue-500 p-4 z-50">
    <div className="flex justify-end m-0 p-0">
    <Logout />
    </div>
  </div>
  )
}

export default Appbar