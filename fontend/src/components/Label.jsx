
import PropTypes from 'prop-types';
function Label({htmlFor,label}) {
    return (
      <div>
              <label htmlFor={htmlFor} className="block m-2 text-lg font-medium text-gray-900">{label}</label>
          </div>
    )
  }
  
  Label.propTypes = {
    htmlFor: PropTypes.string,
    label: PropTypes.string,

  };

  export default Label