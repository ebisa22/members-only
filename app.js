import express from 'express';
import path from 'node:path';
import {session,passport} from './auth.js';
import homeRouter from './routes/home.js';
import signUpRouter from './routes/signup.js';
import loginRouter from './routes/login.js';
const __dirname=import.meta.dirname;
const PORT=process.env.PORT || 3000
const app=express();

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(session);
app.use(passport.session());

app.use('/',homeRouter);
app.use('/signup',signUpRouter);
app.use('/login',loginRouter);

app.listen(PORT,(err)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log("Listening to port",PORT);
})

// Cat#Box1

