
import express, { json } from 'express'
import { middleware } from '../userAuth/auth.js';
import axios from 'axios'

export const quiz = express.Router();

// quiz.use(middleware);

quiz.get("/",async(req,res)=>{
    
  try {
    const response =await axios.get('https://opentdb.com/api.php?amount=10');
    console.log("response.data",response.data);
    res.json({questions:response.data.results})
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
})




// getting the catagories to populate in frontend
quiz.get("/catagories", async(req,res)=>{

  try {
    
    const response = await axios.get(`https://opentdb.com/api_category.php`);
    console.log(response.data)
    res.json({ catagory: response.data});

  } catch (error) {
    console.error('Error fetching catagory:', error);
    res.status(500).json({ message: 'Failed to fetch catagory' });
  }

})

// fetching the question with specific catagory by using catagory id
quiz.get('/questions/:categoryId', async (req, res) => {
  try {
      console.log("req.body",req.params)
    const {categoryId } = req.params;
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}`);
    console.log(response.data)
    res.json({ questions: response.data.results });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});



// fetching question by filtering catagory and difficulty
quiz.get('/questions/catagory/:catagoryId/difficulty/:difficulty', async (req, res) => {
  try {
      console.log("req.body",req.params)
    const catagoryId =req.params.catagoryId;
    const difficulty = req.params.difficulty
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${catagoryId}&difficulty=${difficulty}`);
    console.log( response.data.results)
    res.json({ questions: response.data.results });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});


// fetching question by filtering catagory, difficulty and type
quiz.get('/questions/:catagoryId/:difficulty/:type', async (req, res) => {
    try {
        console.log("req.body",req.params)
      const catagoryId = req.params.catagoryId;
      const difficulty = req.params.difficulty;
      const type = req.params.type;
      const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${catagoryId}&difficulty=${difficulty}&type=${type}`);
      console.log(response.data)
      res.json({ questions: response.data.results });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Failed to fetch data' });
    }
  });
  


  quiz.get('/questions/difficulty/:difficulty',async(req,res)=>{
    try {
      console.log("req.body",req.params)
    const difficulty = req.params.difficulty;
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`);
    console.log(response.data)
    res.json({ questions: response.data.results });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
  })

  quiz.get('/questions/type/:type',async(req,res)=>{
    try {
      console.log("req.body",req.params)
    const type = req.params.type;
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&type=${type}`);
    console.log(response.data)
    res.json({ questions: response.data.results });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
  })

  quiz.get('/questions/difficulty/:difficulty/type/:type',async(req,res)=>{
    try {
      console.log("req.body",req.params)
      const difficulty =req.params.difficulty
    const type = req.params.type;
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=${type}`);
    console.log(response.data)
    res.json({ questions: response.data.results });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
  })

  quiz.get('/questions/catagory/:catagoryId/type/:type',async(req,res)=>{
    try {
      console.log("req.body",req.params)
      const catagoryId = req.params.catagoryId;
    const type = req.params.type;
    const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${catagoryId}&type=${type}`);
    console.log(response.data)
    res.json({ questions: response.data.results });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
  })


