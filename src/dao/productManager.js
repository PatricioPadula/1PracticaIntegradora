import { __dirname } from "../utils.js";
import path from "path";
import fs from "fs";
import {v4 as uuidv4} from "uuid";

export class ProductManager{
    constructor(fileName){
        this.path = path.join(__dirname,`/files/${fileName}`);
    };

    fileExist(){
        return fs.existsSync(this.path);
    }

    async get(){
        try {
            if(this.fileExist()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                return products;
            }else{
                throw new Error("No es posible obtener los productos");
            };
        } catch (error) {
            throw error;
        }
    };

    async save(product){
        try {
            if(this.fileExist()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                /* let newId = 1;
                if(products.length>0){
                    newId = products[products.length-1].id+1;
                } */
                let newId = uuidv4();
                const newProduct = {
                    id:newId,
                    ...product
                }
                products.push(newProduct);
                await fs.promises.writeFile(this .path, JSON.stringify(products,null,"\t"));
                return newProduct;
            }else{
                throw new Error("No es posible esta operación");
            };
        } catch (error) {
            throw error;
        }
    }
}

