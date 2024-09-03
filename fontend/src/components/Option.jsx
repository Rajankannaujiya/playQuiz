
import PropTypes from 'prop-types';
export function Options({ isClicked }) {
    return (
      <div className={`${isClicked ? "block" : "hidden"} options-container`}>
        {/* Your options go here */}
        <p>Option 1</p>
        <p>Option 2</p>
        <p>Option 3</p>
      </div>
    );
  }
  
  Options.propTypes = {
    isClicked: PropTypes.bool.isRequired,
  };