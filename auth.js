import passport from "passport";
import expressSession from "express-session";
import connectPgSimple from "connect-pg-simple";
import {Strategy as LocalStrategy} from "passport-local";
import pool from "./db/pool.js";
import db from "./db/query.js";
import bcrypt from "bcryptjs";

const pgSession = connectPgSimple(expressSession);
const session = expressSession({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
  store:new pgSession({
    pool,
    tableName:"session"
  })
});

const localStrategy=new LocalStrategy(async(username,password,done)=>{
    try{
    const user=await db.getUserByUsername(username);
    if(!user)
        return done(null,false,{message:"Incorrect username"});
    const matchPassword=await bcrypt.compare(password,user.password);
    if(!matchPassword)
        return done(null,false,{message:"Incorrect password"});

    return done(null,user);
    }catch(err){
      return done(err);
}
})

passport.use(localStrategy);
passport.serializeUser(async(user,done)=>{
    done(null,user.user_id);
})

passport.deserializeUser(async(user_id,done)=>{
    try{
   const user=await db.getUserById(user_id);
   if(!user){
    return done(null,false)
   }
   return done(null,user);
    }catch(err){
        done(err);
    }
})


export {session,passport};

