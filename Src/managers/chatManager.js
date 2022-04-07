import fs from "fs"
import path from 'path';
import { normalize,denormalize,schema } from "normalizr";
const author = new schema.Entity("author")
const message = new schema.Entity("message")
const messageSchema = new schema.Entity("chat",{
    author:author,


})

function denormalizer(){
   let normalData = denormalize(noramlizedData.result,messageSchema,normalizeData.entities)
}
const __dirname = path.resolve();

const paths = __dirname+"/./Files/Log.JSON"

const fetch = async()=>{
    let data = await fs.promises.readFile(paths, "utf-8")
    let messages = JSON.parse(data)
    return messages
}

const getTime =()=>{
    let getTime = new Date()
    let date = getTime.getDate()+"/"+(getTime.getMonth()+1)+"/"+getTime.getFullYear()
    let time = getTime.getHours()+":"+getTime.getMinutes()+":"+getTime.getSeconds()
    let dateTime = date+" "+time
    return dateTime

}


class chatManager{
    
    get = async()=>{
        if(fs.existsSync(paths)){
            try{
                let messages = await fetch()
                
                let data =[]
                    let normalizeData = normalize(messages,[messageSchema])
                    data.push(normalizeData)

                return normalizeData
            }catch(error){
                return{status:"error",error,error}
            }
        }
    }   
    denormalize= async(data)=>{
        let normalData = denormalize(data.result,[messageSchema],data.entities)
        return normalData
     }
     porcentaje = async(data)=>{
        let normalizeData = normalize(data,[messageSchema])
        let normalizedLenght = JSON.stringify(normalizeData, null, '\t').length;
        let originalLenght = JSON.stringify(data, null, '\t').length;
       let porcentaje = (originalLenght * 100) / normalizedLenght
       console.log(porcentaje)
       return porcentaje
     }
    save = async(message)=>{
        if(fs.existsSync(paths)){
        try{
            let messages = await fetch()
            if(messages.id === 0){
                const times = getTime()
                message.time = times
                message.id = 1
                await fs.promises.writeFile(paths,JSON.stringify([message],null,2))
                return {status:"success",message:"message sent"} 
            }
            const times = getTime()
            console.log(messages.length)
            message.time = times
            message.id = messages[messages.length-1].id+1
            messages.push(message)
            await fs.promises.writeFile(paths,JSON.stringify(messages,null,2))
            return {status:"success",message:"message sent"}
    
        }catch(error){
        return {status:"error",error:error}
    }
    }
    message.id = 1
    const times = getTime()
    message.time = times
    await fs.promises.writeFile(paths,JSON.stringify([message],null,2))
    return {status:"success",message:"Product added"}


    }

}

export default chatManager