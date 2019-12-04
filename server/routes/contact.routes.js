const express = require('express');
const router = express.Router();
const contact = require('../controllers/contacts.controlers');
const mongoose = require('mongoose');
const db = "mongodb://liz:lizard0105@ds213615.mlab.com:13615/lizarddb" // connection string 
const User = require('../models/user');
const textPrefijado = 'Thank you for registration';
const jwt = require('jsonwebtoken');



mongoose.connect(db,err=>{
    if(err){
        console.error('no funciona' + err)
    } else{
        console.log('Conectado a mongodb')
    }
})
function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unathorized reuqest')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('Unathorized reuqest')
    }
    req.userId = payload.subject
    next()
}
router.post('/',contact.sendMail);
router.post('/register', (req,res)=>{
    let userData = req.body
    
    let user = new User(userData)
    user.save((error, registeredUser)=>{
        //falta validar que el usuario no exista... 
        if(error){
            console.log(error)
        }else{
            crearToken()
            let payload = {subject:registeredUser._id}
            let token = jwt.sign(payload, 'secretkey')
            res.status(200).send({token})
         
           
            
        }
    })

});




router.get('/',contact.getContact);

router.post('/login',(req,res)=>{
    let userData = req.body
    User.findOne({email: userData.email},(error,user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid Email')
            }else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid password')

                }else{
                    
                    let payload = {subject:user._id}
                    let token = jwt.sign(payload, 'secretkey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

router.get('/events',(req,res)=>{
    let events=[
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          }
    ]
    
  res.json(events)
})

router.get('/special',verifyToken, (req,res)=>{
    let events=[
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          },
          {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
          }
    ]
    
  res.json(events)
})
module.exports = router;