import express, { json }  from "express"
import {Server}  from'socket.io'
import handlenbars from "express-handlebars"
import productManager from './managers/productManager.js'
import chatManager from "./managers/chatManager.js";
import path from 'path';
import productRouter from "./routes/products.js"
import { normalize,denormalize,schema } from "normalizr";



const __dirname = path.resolve();
const app = express()
const PORT = process.env.PORT||8080
const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`))
const io = new Server(server)
app.use(express.static(__dirname+'/Public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



let productService = new productManager
let chatService = new chatManager


io.on('connection',async socket=>{
   console.log("Cliente conectado")

   let products = await productService.get()
   io.emit("productLog", products)

   let chat = await chatService.get()
   let log = await chatService.denormalize(chat)
   let porcentaje = await chatService.porcentaje(chat)
   io.emit("chatLog", log,chat,porcentaje)


   socket.on('sendProduct',async data=>{
      await productService.save(data)
      let products = await productService.get()
      io.emit('productLog',products)
   })

   socket.on('sendChat',async data=>{
      await chatService.save(data)
      let chat = await chatService.get()
      let log = await chatService.denormalize(chat)
      io.emit('chatLog',log,chat)
   })



})



app.use('/api/productos-test',productRouter);
