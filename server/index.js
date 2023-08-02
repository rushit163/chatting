const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('./modules/user');
const bcrypt = require('bcryptjs')
const cookieParsser = require('cookie-parser');
const ws = require('ws')

mongoose.connect(process.env.MONGO_URL)
app.use(express.json());
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(cookieParsser())
const jwtSecret = process.env.JWT_KEY;
const bcryptSalt = bcrypt.genSaltSync(10)
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
        res.json('no cookies found');
        
    }
}
)

app.post('/login', async (req,res)=>{
        const {username, password} = req.body;
        const foundUser = await User.findOne({username,password});
        if(foundUser){
            const passOk = bcrypt.compareSync(password,foundUser);
            if(passOk){
                jwt.sign({userId : foundUser._id,username},jwtSecret,{},(err,token)=>{
                    if(err){
                        throw err;
                    }
                    res.cookie('token', token).status(201).json({
                        id: foundUser._id
                    });
                })
            }else{
                res.json('wrong password')
            }
        }else{
            res.json("no user").status(201)
        }
})
app.post('/register', async (req,res)=>{
    try{
    const {username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt)
    const createUser = await User.create({
        username: username,
        password : hashedPassword});
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


const server = app.listen(5000);

const wss = new ws.WebSocketServer({server});
wss.on('connection',(connection,req)=>{
    const cookies = req.headers.cookie;
    if(cookies){
        const tokenString = cookies.split(';').find(str=>str.startsWith('token='));
        if(tokenString){
            const token = tokenString.split('=')[1];
             if(token){
                jwt.verify(token, jwtSecret,{},(err, userData)=>{
                    if(err) throw err;
                    const {userId,username} = userData;
                    connection.userId = userId;
                    connection.username = username;
                }) 
             }
        }
    }
})