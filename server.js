'use strict';
const express=require('express');
const app=express();
const body_parser=require('body-parser');

const PORT=process.env.PORT || 4000;
const HOST=process.env.HOST || 'localhost';

const books_router=require('./src/server/routes/books.router');


app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers',"Content-Type");
  next();
})


app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json({extended: true}));

app.use("/api/books",books_router);


app.use(express.static('dist'));

app.listen({
  host: HOST,
  port: PORT
});
