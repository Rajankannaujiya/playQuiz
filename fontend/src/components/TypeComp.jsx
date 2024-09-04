

import PropTypes from 'prop-types'
import { useRecoilState } from 'recoil';
import { getType } from '../recoil';


export function TypeComp( {isTrue}) {


const types = ["multiple choice", "true / False"]

  const [quizTypes, setQuizTypes] = useRecoilState(getType)

  console.log(quizTypes)

  function handleCheckboxChange (value){
    if(value === "multiple choice"){
      setQuizTypes("multiple")
    }
    else{
      setQuizTypes("boolean")
    }

  }


    console.log(isTrue)
    return (
isTrue  &&  (<div   className="fixed z-50 w-full sm:w-72 max-h-96 overflow-y-auto bg-white p-4 rounded shadow-lg" >
        <div className="row justify-content-center">
          {types &&
            types.map((Val,index) => (
              <div
                className="col-md-4 col-sm-6 card my-3 py-3 border-0"
                key={index}
              >
              
                <div className="card-body">
                  <div className="card-title fw-bold fs-4 flex justify-start">
    
                    <button onClick={()=>{
                      Val === "multiple choice" ? setQuizTypes('multiple') : setQuizTypes('boolean')
                    }}>
                      <div className='flex justify-start text-start'>
                      <input type="checkbox" checked={(quizTypes=== "multiple" && Val==="multiple choice") || (quizTypes=== "boolean" && Val==="true / False")} onChange={() => handleCheckboxChange(Val)}
            value={index} className='m-2 p-1'/>{Val}
                     </div>
                      </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>)
      )}


    TypeComp.propTypes = {
    isTrue: PropTypes.bool.isRequired,
  };