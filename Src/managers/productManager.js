import fs from "fs"
import path from 'path';
const __dirname = path.resolve();

const paths = __dirname+"/./Files/productos.JSON"

const fetch = async()=>{
    let data = await fs.promises.readFile(paths, "utf-8")
    let products = JSON.parse(data)
    return products
}


class productManager{
    
    get = async()=>{
        if(fs.existsSync(paths)){
            try{
                let products = await fetch()
                return {status:"success", payload: products}
            }catch(error){
                return{status:"error",error,error}
            }
        
    }
}

    save = async (product)=>{
        if(fs.existsSync(paths)){
           try{
             let products = await fetch()
             if(products.id=== 0){
                product.id = 1
                 await fs.promises.writeFile(paths,JSON.stringify([product],null,2))
                 return {status:"success",message:"Product added"}
             }
             product.id = products[products.length-1].id+1
             products.push(product)
             await fs.promises.writeFile(paths,JSON.stringify(products,null,2))
             return {status:"success",message:"Product added"}

         }catch(error){
             return {status:"error",error:error}
         }
     }
     product.id = 1
     await fs.promises.writeFile(paths,JSON.stringify([product],null,2))
     return {status:"success",message:"Product added"}
    }

}



export default productManager