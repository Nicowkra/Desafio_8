import express from 'express'
import faker from "faker"

const router = express.Router()

router.get('/', function(req, res) { 
   let objects=[]
   for(let i =0;i<5;i++){
       objects.push({
        title:faker.commerce.product(),
        price:faker.commerce.price(),
        thumbnail:faker.image.business()
        })
   }
   res.send(objects)
});


export default router