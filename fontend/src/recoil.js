import {atom, selector} from 'recoil';
import axios from 'axios'
import { BACKEND_URL } from './config.js';


export const isSigninStatus = atom({
    key:"isSigninStatus",
    default:false
})


export const getCatagoryId = atom({
    key:"getCatagoryIdAtom",
    default:null
})


export const getLevel = atom({
    key:"getLevelAtom",
    default:null
})


export const getType = atom({
    key:"ggetTypeAtom",
    default:null
})

export const skip = atom({
    key:"skipAtom",
    default:false
})

export const catagory = atom({
    key:"catagoryAtom",
    default:null
})


export const back = atom ({
    key:"backAtom",
    default:false
})

export const submit = atom({
    key:"submitAtom",
    default:false
})

export const selectedAnswer = atom({
    key:"selectedAnsweratom",
    default:null
})


export const score =atom({
    key:"scoreAtom",
    default:0
})

export const filer= atom({
    key:"filterAtom",
    default:false
})

export const quizQuestionsAtom = atom({
    key:"questionAtom",
    default:[]
}) 

export const quizQuestionSelector=  selector({
    key:"QuestionSelector",
    get:async({get})=>{
        get(quizQuestionsAtom)
        const categoryId = get(getCatagoryId);
        const difficulty = get(getLevel);
        const type = get(getType);
        const isFilered =get(filer)

        try {
        
            if(!categoryId && !difficulty && !type){
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz`);
                console.log(response.data.questions);
                return [...response.data.questions]
            }
            // works fine
            if(categoryId && difficulty && type&& isFilered){
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/${categoryId}/${difficulty}/${type}`);
                console.log(response.data)
                return [...response.data.questions]
            }
                // works fine
            else if(categoryId && difficulty && isFilered){
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/catagory/:${categoryId}/difficulty/${difficulty}`);
                console.log("this is the questions with catagory",response.data.questions)
                return [...response.data.questions]
            }

            else if(categoryId && type  && isFilered){
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/catagory/${categoryId}/type/${type}`);
                console.log("this is the questions with catagory",response.data.questions)
                return [...response.data.questions]
            }

            else if(difficulty && type&& isFilered){
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/difficulty/${difficulty}/type/${type}`);
                console.log("this is the questions with catagory",response.data.questions)
                return [...response.data.questions]
            }
            // works fine
            else if(categoryId && isFilered){
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/${categoryId}`);
                return [...response.data.questions]
            }

            else if(difficulty && isFilered){
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/difficulty/${difficulty}`);
                return [...response.data.questions]
            }

            else if(type && isFilered){
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/type/${type}`);
                return [...response.data.questions]
            }

          

        } catch (error) {
            console.log("an error occurred while fetching questions",error);
            throw new Error("an error occurred while fetching questions")
        }
    }
})


export const CatagoryAtom = atom({
    key:"CatagoryAtom",
    default:selector({
        key: 'CatagorySelector',
        get: async() => {
            
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/catagories`)

                console.log("this is the catagory",response.data.catagory.trivia_categories);
    
                return response.data.catagory.trivia_categories; 
            } catch (error) {
                console.log("an error occurred while fetching questions",error);
                throw new Error("an error occurred while fetching questions")
            }


        },
      }),
})


export const isSignin = atom({
    key:"isSignInAtom",
    default:false
})

export const isAuthenticated = selector({
    key: "checkUserTokenSelector",
    get: ({ get }) => {
        get(isSignin)
        const token = localStorage.getItem("token");
        if (!token || token === 'undefined') {
            return false; // User is not authenticated
        }
        return true; // User is authenticated
    },
});