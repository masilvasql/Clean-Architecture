//Agregados

import OrderItem from "./orderItem";

export default class Order {
    private _id:string ;
    private _customerID:string;
    private _items:OrderItem[];
    private _total:number;

    constructor(id:string, customerID:string, items:OrderItem[]){
        this._id = id;
        this._customerID = customerID;
        this._items = items;
        this._total = this.total()
        this.validate()
    }

    get id():string{
        return this._id;
    }

    get customerID():string{
        return this._customerID;
    }

    get items():OrderItem[]{
        return this._items;
    }

    

    total():number{
        return this._items.reduce((total, item) => (total + (item.price * item.quantity)) , 0);
    }

    validate():boolean{
        if(this._items.length === 0){
            throw new Error("Order without items");
        }

        if(this._customerID.length ===0 ){ 
            throw new Error("CustomerID is Required");
        }

        if(this._id.length===0){
            throw new Error("Id is Required");
        }

        if(this._items.some(item => item.quantity <= 0)){
            throw new Error("Quantity must be greater than zero");
        }

        return true
    }

  

    
}