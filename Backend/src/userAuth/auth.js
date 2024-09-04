

import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

console.log(dotenv.config())


export const user = express.Router(); 

const prisma = new PrismaClient()


user.get("/me",(req,res)=>{

    res.send("hii there")
})

const saltRounds =10;
console.log("I reach here")


user.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body)
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (user) {
            return res.status(400).json({ error: "Email or username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("Password is hashed", hashedPassword);

        // Create new user
        const customId = new ObjectId().toString();
        const newUser = await prisma.user.create({
            data: {
                id:customId,
                username: username,
                email: email,
                password: hashedPassword
            }
        });

        if (!newUser) {
            return res.status(500).json({ error: "Error during signup" });
        }

        // Create a JWT token
        const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        if (!token) {
            // Delete the user if token creation fails
            await prisma.user.delete({
                where: {
                    id: newUser.id
                }
            });
            return res.status(500).json({ error: "Failed to create token" });
        }

        res.status(201).json({ jwt: token });

    } catch (error) {
        console.error("An error occurred during signup", error.message);
        res.status(500).json({ error: "Failed to signup" });
    }
});




user.post("/signin",async(req,res)=>{

    try {
        const { email, password} = req.body;
        if( !email || !password){
            res.json("all fields are required");
            return;
        }

        const user = await prisma.user.findFirst({
            where:{
                email:email
            }
        })

        if(!user){
            res.status(400).json({error:"user doesn't exist"})
        }
        const result = await bcrypt.compare(password, user.password)
            
        if(result === false){
            res.status(400).json({msg: "password is incorrect"})
        }

           const token = jwt.sign(user, process.env.JWT_SECRET);

           res.json({jwt:token});
        
    } catch (error) {
        console.log("an error occur while signin", error.message);
        res.status(404).json("failed to signin");
        return
    }
})


//  middleware

export const middleware = async(req,res,next)=>{

      // Extract token from authorization header
      const token = req.headers['authorization'];

    if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }


      const payload = jwt.verify(token, process.env.JWT_SECRET);
        
    if (!payload) {
        res.status(401).json({ error: "Unauthorized! No payload" });
        return;
      }

    
      req.userId = payload.userId;
   
      next();
}


user.get('/logout',middleware, async (req, res) => {
    try {
      // Extract token from authorization header
      const token = req.headers['authorization'];
      
      if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const secret =  process.env.JWT_SECRET;
      if(!secret){
        throw new Error ("no secret provided")
      }

      const decoded = jwt.verify(token, secret)
  
  
      if (req.userId === decoded.userId) {
       
        req.userId = undefined;
        res.status(200).json({ message: 'Logout successful, token invalidated.' });
      } else {
        res.status(401).json({ error: 'Token is invalid or does not match' });
      }
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'An error occurred during logout' });
    }
  });