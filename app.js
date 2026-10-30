import express from 'express';
import path from 'node:path';
const __dirname=import.meta.dirname;

const app=express();

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
