/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import Spinner from "./Spinner.jsx";



function Button({type,onClick,buttonFor,colour,isClicked}) {
  console.log("this is the color",colour)
  return (
    <div>

      <button onClick={onClick} type={type} className={`w-full text-white ${
    colour === 'green'
      ? 'bg-green-800 hover:bg-green-900'
      : colour === 'blue'
      ? 'bg-blue-800 hover:bg-blue-900'
      : colour=='red'? 'bg-red-800 hover:bg-red-900':'bg-gray-800 hover:bg-gray-900'
  }  focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5`}>{isClicked? <div className="flex justify-center"> <Spinner/> </div> : buttonFor}</button>
    </div>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func.isRequired,
  buttonFor: PropTypes.string.isRequired,
  colour: PropTypes.string,
  isClicked: PropTypes.bool,
};

export default Button
