const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('./modules/user');
const cookieParsser = require('cookie-parser')
mongoose.connect(process.env.MONGO_URL)
app.use(express.json());
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(cookieParsser())
const jwtSecret = process.env.JWT_KEY;

app.get('/profile',(req,res)=>{
    const token = req.cookies?.token;
    if(token){
    jwt.verify(token,jwtSecret,{},(err,userData)=>{
        if(err){throw err;}
        res.json(
            userData
        )
    })}
    else{
        res.status(401).json('no cookie');
    }
}
)


app.post('/register', async (req,res)=>{
    try{
    const {username, password} = req.body;
    const createUser = await User.create({username,password});
     jwt.sign({userId : createUser._id,username},jwtSecret,{},(err,token)=>{
        if(err){
            throw err;
        }
        res.cookie('token', token).status(201).json({
            id: createUser._id
        });
    })
    }
    catch(err){
        if(err){
            throw err;
        }
    }

})


app.listen(5000)