
import { useEffect, useState } from "react";
import Button from "./Button.jsx";
import { SvgIcon } from "./SvgIcon.jsx";
import { CatagoryComp } from "./CatagoryComp.jsx";
import { LevelComp } from "./LevelComp.jsx";
import { TypeComp } from "./TypeComp.jsx";
import QuestionComp from "./QuestionComp.jsx";
import { useSetRecoilState } from "recoil";
import { filer, skip, submit } from "../recoil.js";


function LandingComp() {

  const [showCatagory,setShowCatagory] = useState(false);
  const [showLevel,setShowLevel] = useState(false);
  const [showType,setShowType] = useState(false);
  const setFilter = useSetRecoilState(filer)

  const setISSkipped = useSetRecoilState(skip)
  // const setBack = useSetRecoilState(back)
  const setSubmit = useSetRecoilState(submit)


  function handleSkip() {
    setISSkipped(true)
  }


  // function handleBack(){
  //   setBack(true)
  // }

  function handleSubmit() {
    setSubmit(true)
  }


  useEffect(() => {
    // Function to handle click events
    const handleClickOutside = () => {
      setShowCatagory(false);
      setShowLevel(false);
      setShowType(false);
    };

    // Add event listener for clicks on the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <div className="min-h-screen flex justify-center flex-col w-full m-2 p-2 mt-5">
      <div className="flex justify-center flex-col sm:bg-slate-200 w-full">
        <div className="flex sm:flex-col justify-between m-2 p-2 flex-col">

       <div>
       <div className="flex sm:m-2 sm:p-2 m-1 sm:bg-white bg-slate-200  rounded">
      <p className="mt-2">Catagory</p>
        <SvgIcon onClick={(e) =>{
           e.stopPropagation();
           setShowCatagory(!showCatagory)
           setShowLevel(false); // Close other components when one is opened
           setShowType(false);  // Close other components when one is opened
        }}/>
          <CatagoryComp isTrue={showCatagory}/>
        </div>

       </div>
        <div className="sm:bg-white bg-slate-200 flex sm:m-2 sm:p-2 m-1 rounded">
      <p className="mt-2">Level</p>
        <SvgIcon onClick={(e) => {
          e.stopPropagation();
          setShowLevel(!showLevel)
          setShowCatagory(false); // Close other components when one is opened
          setShowType(false);  // Close other components when one is opened
          }}/>
          <LevelComp isTrue={showLevel}/>
        </div>

        <div className="sm:bg-white bg-slate-200 flex sm:m-2 sm:p-2 m-1 rounded">
      <p className="mt-2">Types</p>
        <SvgIcon onClick={(e)=>{
          e.stopPropagation();
          setShowType(!showType)
          setShowCatagory(false); // Close other components when one is opened
          setShowLevel(false);  // Close other components when one is opened
          }}/>
          <TypeComp isTrue={showType}/>
        </div>
          <div className="mt-2">
            <Button type ={"button"} buttonFor={"Filter"} onClick={()=>{
              setFilter(true)
            }} colour={"bg-green-800"} isClicked={false}/>
          </div>
        </div>

        <div className="flex-grow m-2 p-2 mr-6">

          <div className=" sm:min-h-[200px] bg-white text-black rounded p-2">
         <div><QuestionComp /></div>

           
         
          </div>

          <div className="flex justify-center max-w-sm m-2 p-2 bg-gray-100 sm:flex-row flex-col rounded">

            <div className="sm:m-2 sm:p-2 m-1">
              <Button
                onClick={handleSkip}
                buttonFor={"Skip"}
                colour={"red"}
                isClicked={false}
              />
            </div>

            {/* <div className="sm:m-2 sm:p-2 m-1">
              <Button
                onClick={handleBack}
                buttonFor={"Back"}
                colour={"gray"}
                isClicked={false}
              />
            </div> */}

            <div className="sm:m-2 sm:p-2 m-1">
              <Button
                onClick={handleSubmit}
                buttonFor={"Submit"}
                colour={"green"}
                isClicked={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingComp;




