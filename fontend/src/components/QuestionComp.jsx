import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { filer, quizQuestionSelector, score, selectedAnswer, skip, submit } from "../recoil";
import Spinner from './Spinner.jsx'

function QuestionComp() {


  const [question, setQuestion] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const[optionArray, setOptionArray] = useState([])
  const [ansClicked, setAnswerClicked] = useState(null);
  // const [delayPassed, setDelayPassed] = useState(false);
  const { state, contents } = useRecoilValueLoadable(quizQuestionSelector);

  const [isSkipped,setISSkipped] = useRecoilState(skip);
  const [isSubmitted, setIsSubmitted] = useRecoilState(submit)
  const [userAnswer, setUserAnswer] = useRecoilState(selectedAnswer);
  const [showScore,setShowScore] = useRecoilState(score)
  const [isFiltered,setIsFiltered] = useRecoilState(filer)

  const [count,setCount] =useState(60);


  useEffect(() => {
    if (state === "hasValue") {
      setCurrentQuestionIndex(0);
      setQuestion(contents)
      setIsFiltered(false)
    }
  }, [state, contents, isFiltered]);

  useEffect(() => {
    if (isSkipped || isSubmitted) {
      setCount(60);
    }
  
    if (count > 0) {
      const countdownTimer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
  
      return () => clearTimeout(countdownTimer)
      ; // Cleanup the timeout to avoid memory leaks
    }
  }, [count, isSkipped, isSubmitted]);


  // for displaying the question one by one
  
  useEffect(() => {
    if (question.length > 0 && currentQuestionIndex < question.length) {
      const questionTimer = setInterval(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setCount(60); // Reset count every time a new question is shown
        setAnswerClicked(false)
      }, 60000); // 60 seconds interval for each question
  
      // Handle skipping and submitting the question
      if (isSkipped || isSubmitted) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setCount(60);
        setAnswerClicked(false)
        setIsSubmitted(false);
        setISSkipped(false);
      }
  

  
      return () => clearInterval(questionTimer); // Clear interval on component unmount or re-render
    }
  }, [question, currentQuestionIndex, isSkipped, isSubmitted]);
  
  

const singleQuestion = question[currentQuestionIndex];
const correctAnswer = singleQuestion?.correct_answer
const incorrectAnswer = singleQuestion?.incorrect_answers || []


// to make the options Randomly available and using UseEffect because the page was rerendering due to change of count value every second so the options were changing every second.
useEffect(()=>{
 const shufledArray = [...incorrectAnswer,correctAnswer].sort(() => Math.random() - 0.5);
 setOptionArray(shufledArray)
},[singleQuestion])


//if the answer is correct when user submitted if it is correct then icrease the score by 1
useEffect(()=>{

  if(userAnswer === correctAnswer && isSubmitted){
    setShowScore(score=>score+1)
  }
},[correctAnswer, isSubmitted, setShowScore, userAnswer])




  return (
    <div className="flex justify-between items-center p-2 text-black flex-col">
        <div className="flex justify-center">
        {currentQuestionIndex <question.length ?<p className="bg-slate-500 p-2 m-2 text-white rounded">Question:{currentQuestionIndex+1}/10</p> : ""
        }
            {currentQuestionIndex <question.length ?<p className="bg-red-500 p-2 m-2 text-white rounded">RemainingTime:{count}</p>:""}
           {currentQuestionIndex <question.length ? <p className="bg-green-700 p-2 m-2 text-white rounded">Score:{showScore}</p>: ""}
          </div>
    {singleQuestion ? (
      <div key={currentQuestionIndex}>
        <div className="text-black">
          {singleQuestion.question || "Question not available"}
        </div>
      <div className={`flex justify-start flex-col items-start rounded `}>
      {optionArray.map((answerOp, index) => (
          <div key={index} className={` font-light m-2 p-2 hover:bg-slate-300 w-60 flex justify-start items-start rounded ${ansClicked === index ? "bg-slate-400" : ""}`}>
            <button onClick={() => {
              setUserAnswer(answerOp);
              setAnswerClicked(index)
            }}>
              <div>{index+1}. {answerOp}</div>
            </button>
          </div>
        ))}
      </div>
      </div>
    ) : 
    currentQuestionIndex >question.length -1 ? (<div className="flex justify-center items-center font-semibold">Your Score is {showScore}</div>): (
      <div> <Spinner /></div>
    )}
  </div>
);
}

export default QuestionComp;