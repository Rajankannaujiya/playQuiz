import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';
import { getLevel } from '../recoil';

export function LevelComp({ level , isTrue}) {


  const [selectLevel, setSelectLevel] = useRecoilState(getLevel)


  function handleCheckboxChange (value){
    setSelectLevel(value)
  }

  console.log(selectLevel)

    console.log(isTrue)
    return (
isTrue  &&  (<div   className="fixed z-50 w-full sm:w-72 max-h-96 overflow-y-auto bg-white p-4 rounded shadow-lg" >
        <div className="row justify-content-center">
          {level &&
            level.map((Val,index) => (
              <div
                className="col-md-4 col-sm-6 card my-3 py-3 border-0"
                key={index}
              >
              
                <div className="card-body">
                  <div className="card-title fw-bold fs-4 flex justify-start">
    
                    <button onClick={()=>setSelectLevel(Val)}>
                    <div className='flex justify-start text-start'>
                    <input type="checkbox" checked={selectLevel === Val} onChange={() => handleCheckboxChange(Val)}
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


      LevelComp.propTypes = {
    level: PropTypes.array.isRequired,
    isTrue: PropTypes.bool.isRequired,
  };