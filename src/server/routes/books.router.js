const express=require('express');
const router = express.Router();
const BookParser=require('../functionalities/books_parser');
const parser=new BookParser();

router.get('/',(req,res)=>{
  res.json(parser.getAllBooks());
});

router.post('/title',(req,res)=>{
  res.json(parser.filterByTitle(req.body.query));
});

router.post('/OLID',(req,res)=>{
  res.json(parser.filterByOLID(`OLID:${req.body.query}`));
});

module.exports=router;
