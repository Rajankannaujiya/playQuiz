

import express from 'express';
import { user } from './src/userAuth/auth.js';
import { quiz } from './src/quizApi/quizApi.js';
import cors from 'cors'

const app =express();

app.use(cors({
    origin: "https://play-quiz-ojnfrontend.vercel.app"
    ));

const PORT = process.env.PORT || 5000


app.use(express.json())

app.use(express.urlencoded({ extended: true ,limit:'50mb'}));
app.get("/", (req,res)=>{
    res.send("hello there");
})

app.use("/api/v1/user",user);
app.use("/api/v1/quiz",quiz);


app.listen(PORT, function(){
    console.log(`server is listening on http://localhost:${PORT}`)
})
