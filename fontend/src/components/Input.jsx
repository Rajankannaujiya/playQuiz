
import PropTypes from 'prop-types';



function Input( {placeholder, type, onChange ,name}
) {
  return (
    <div>
      <input
        type={type || "text"}
        name={name}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}


Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
};
export default Input;
