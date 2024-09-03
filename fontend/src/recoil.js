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
        const level = get(getLevel);
        const type = get(getType);
        const isFilered =get(filer)

        try {

            if(categoryId && level && type && isFilered){
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/${categoryId}/${level}`);
                console.log(response.data)
                return response.data   
            }

            else if(categoryId && level && isFilered){
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/${categoryId}/${level}`);
                console.log(response.data)
                return response.data
            }

            else if(categoryId && isFilered){
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/${categoryId}`);
                console.log(response.data.questions)
                return response.data.questions
            }
            
            else{
                const response = await axios.get(`${BACKEND_URL}/api/v1/quiz`)

                console.log(response.data.questions);
    
                return response.data.questions;
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



// export const sortByCatagory = atomFamily({
//     key:"sortByCatagoryAtom",
//     default:selectorFamily({
//         key:"sortByCatagorySelector",
//         get: (id)=>async ({get}) =>{
//           try {
//               get(quizQuestionsAtom)
//               const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/${id}`);
//               console.log(response.data)
//               return response.data
//           } catch (error) {
//             console.log("an error occurred while fetching questions",error);
//             throw new Error("an error")
//           }
//         }
//     })
// })

// export const sortByCatagoryAndLevel = atom({
//     key:"sortByCatagoryAndLevelAtom",
//     default:selector({
//         key:'sortByCatagoryAndLevelSelector',
//         get:(id,level)=>async({get})=>{
//             try {
//                 get(quizQuestionsAtom)
//                 const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/${id}/${level}`);
//                 console.log(response.data)
//                 return response.data
//             } catch (error) {
//                 console.log("an error occurred while fetching questions",error);
//                 throw new Error("error")
//             }
//         }
//     })
// })


// export const sortByCatagoryLevelAndTypes = atom({
//     key:"sortByCatagoryLevelAndTypesAtom",
//     default:selector({
//         key:'sortByCatagoryLevelAndTypesSelector',
//         get:(id,level,type)=>async({get})=>{
//             try {
//                 get(quizQuestionsAtom)
//                 const response = await axios.get(`${BACKEND_URL}/api/v1/quiz/questions/${id}/${level}/${type}`);
//                 console.log(response.data)
//                 return response.data
//             } catch (error) {
//                 console.log("an error occurred while fetching questions",error);
//                 throw new Error("error")
//             }
//         }
//     })
// })

