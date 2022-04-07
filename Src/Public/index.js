const socket = io()
let productForm = document.getElementById("productsForm")



productForm.addEventListener("submit",(evt) =>{
    evt.preventDefault()
    let data = new FormData(productForm)
    let sendObj = {}
    data.forEach((val,key)=>sendObj[key]=val)
    socket.emit("sendProduct",sendObj)
    productForm.reset()
})

let chatForm = document.getElementById("chatForm")

chatForm.addEventListener("submit",(evt) =>{
    evt.preventDefault()
    let message = document.getElementById("message").value
    let user = document.getElementById("email").value
    let name = document.getElementById("name").value
    let lastName = document.getElementById("lastName").value
    let age = document.getElementById("age").value
    let alias = document.getElementById("alias").value
    let avatar = document.getElementById("avatar").value
    let author = {id:user,name:name,lastName:lastName,age:age,alias:alias,avatar:avatar}
    let sendObj ={author:author,message:message}
    socket.emit("sendChat",sendObj)
})

socket.on('productLog',(data)=>{
    let products = data.payload
    let productTemplate = document.getElementById("productTemplate")
    fetch('Template/newProduct.handlebars').then(response=>{
        return response.text()
    }).then(template=>{
        const processedTemplate = Handlebars.compile(template)
        const html = processedTemplate({products})
        productTemplate.innerHTML = html

    })
})


socket.on('chatLog',(data,chat,porcentaje)=>{
    if(data){
        
        let log = document.getElementById('log')
        let messages = ""
        console.log(chat)
        data.forEach(function(entry){
            messages  = messages+ `<span class ="user">${entry.author.id}</span> <span class ="time">[${entry.time}]:</span><span class ="message">${entry.message}</span></br>`
        })
        log.innerHTML = messages
        per.innerHTML = `<h2>Compresión ${porcentaje}%</h2>`
}
})


