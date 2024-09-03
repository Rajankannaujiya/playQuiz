import PropTypes from 'prop-types';
// import { useState } from 'react';
import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { catagory, CatagoryAtom, getCatagoryId } from '../recoil';
import { useEffect, useState } from 'react';

export function CatagoryComp({ isTrue}) {


  const [selectCatagory, setSelectCatagory] = useRecoilState(catagory);

  const [catagoryItem, setCatagoryItem] = useState(null);
  const setCatagoryId = useSetRecoilState(getCatagoryId);


  const {state , contents} = useRecoilValueLoadable(CatagoryAtom)
  console.log("this is the catagory item",catagoryItem)


  function handleCheckboxChange (value){
    setSelectCatagory(value)
  }
 
  useEffect(()=>{

    if(state === 'hasValue'){
      setCatagoryItem(contents);
    }

  },[state,contents])

  console.log(selectCatagory)

    console.log(isTrue)
    return (
isTrue  &&  (<div   className="fixed z-50 w-full sm:w-72 max-h-96 overflow-y-auto bg-white p-4 rounded shadow-lg" >
        <div className="flex flex-col justify-start items-start m-0 p-0 gap-0">
          {catagoryItem &&
            catagoryItem.map((Val) => (
              <div
                className="col-md-4 col-sm-6 card my-3 py-3 border-0"
                key={Val.id}
              >
              
                <div className="card-body">
                  <div className="card-title fw-bold fs-4 flex justify-start">
    
                    <button onClick={()=>{
                      setSelectCatagory(Val.name)
                      setCatagoryId(Val.id)
                    }} >
                     <div className={`hover:bg-slate-300 flex justify-start text-start pr-5`}>
                     <input type="checkbox" checked={selectCatagory === Val.name} onChange={() => handleCheckboxChange(Val.name)}
            value={Val.id} className='m-2 p-1'/>{Val.name}
                     </div>
                      </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>)
      )}


    CatagoryComp.propTypes = {
    isTrue: PropTypes.bool.isRequired,
  };