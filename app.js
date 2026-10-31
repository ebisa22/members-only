import express from 'express';
import path from 'node:path';
import {session,passport} from './auth.js';
import homeRouter from './routes/home.js';
import signUpRouter from './routes/signup.js';
import loginRouter from './routes/login.js';
import messagesRouter from './routes/messages.js';
import error404 from './controllers/errors/error404.js';
import internalError from './controllers/errors/internalError.js';
const __dirname=import.meta.dirname;
const PORT=process.env.PORT || 3000
const app=express();

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(session);
app.use(passport.session());

app.use((req, res, next) => {
  const user=req.isAuthenticated()?req.user : null;
  res.locals.currentUser = user;
  next();
});
app.use('/',homeRouter);
app.use('/signup',signUpRouter);
app.use('/login',loginRouter);
app.use('/messages',messagesRouter);

//error handling
app.use(error404);
app.use(internalError);


app.listen(PORT,(err)=>{
    if(err){
        console.error(err);
        return;
    }
    console.log("Listening to port",PORT);
})




