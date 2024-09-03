
import PropTypes from 'prop-types';


function Alert(textColor,alertType,alertContent) {
  return (
    <div className={`p-4 mb-4 text-sm ${textColor} rounded-lg bg-red-5" role="alert`}>
    <span className="font-medium">{alertType}</span> {alertContent}
  </div>
  )
}

Alert.propTypes = {
  alertType: PropTypes.string,
  alertContent: PropTypes.string,
};


export default Alert