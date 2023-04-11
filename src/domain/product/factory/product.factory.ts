import { v4 } from "uuid";
import ProductB from "../entity/Product-B";
import ProductInterface from "../entity/product.interface";
import Product from "../entity/Products";

export default class ProductFactory{
    public static create(type:string, name: string, price: number): ProductInterface{
    
        switch(type){
            case "A":
                return new Product(v4(), name, price);
            case "B":
                return new ProductB(v4(), name, price);
            default:
                throw new Error("Product type not found");
        }    
    }
}