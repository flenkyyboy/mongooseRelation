const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');




const Doc = require('./docs-model')
const User = require('./user-model')


mongoose.connect('mongodb://localhost:27017/docs',{ useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true, useFindAndModify: false  }, (err)=>{
    if(!err){
        console.log('success');
    }
})
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
   Doc.find({}).populate("user").exec((err,doc)=>{
    if(err){
        res.status(400).send(err)
    }else{
        res.status(200).json(doc)
    }
   })
  
})
app.put('/addDoc/:id',(req,res)=>{
    console.log(req.body);
    const docObj ={
        "title":req.body.title,
        "description":req.body.description,
    }
    Doc.findByIdAndUpdate(req.params.id,docObj,{new:true}).exec((err,doc)=>{
        if(err){
            res.status(400).send(err)
        }else{
            res.status(200).json(doc)
        }
       })
})

app.post('/addUser',(req,res)=>{
    console.log(req.body);
    const userObj = {
        "_id": new mongoose.Types.ObjectId(),
        "name":req.body.name
    }
    const newUser = new User(userObj)
    newUser.save((err,user)=>{
        if(err){
            res.status(400).send(err)
        }else{
            res.status(200).json(user)
        }
    })
})
app.post('/addDoc',(req,res)=>{
    console.log(req.body);
    const docObj ={
        "_id": new mongoose.Types.ObjectId(),
        "title":req.body.title,
        "description":req.body.description,
        "user":"6033a20eca6d0f7f9deb864b"
    }
    const newDoc = new Doc(docObj)
    newDoc.save((err,doc)=>{
        if(err){
            res.status(400).send(err)
        }else{
            res.status(200).json(doc)
        }
    })
})
app.delete('/docs/:id',(req,res)=>{
    Doc.findByIdAndDelete(req.params.id).exec((err,doc)=>{
        if(err){
            res.status(400).send(err)
        }else{
            res.status(200).json(doc)
        }
       })
})

app.listen(5000,()=>{
    console.log('connected');
})