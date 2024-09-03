
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';



// eslint-disable-next-line react/prop-types
function Header({mainHeader, subHeader, linkto, linkfor}) {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="p-2 font-bold text-lg font-sans">
        {mainHeader}
      </div>

      <div className="font-light text-sm font-serif p-1">
        {subHeader}
        <Link to={linkto} className="m-1 p-1 font-bold underline underline-offset-1 cursor-pointer text-lg">
        {linkfor}
        </Link>
      </div>
      
    </div>
  )
}

Header.prototype ={
    mainHeader:PropTypes.string,
    subHeader:PropTypes.string,
    linkto:PropTypes.string,
    linkfor:PropTypes.string
}

export default Header
