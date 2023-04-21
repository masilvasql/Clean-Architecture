import Entity from "../../@shared/entity/entity.abstract";
import ProductBYupValidatorFactory from "../factory/product-B.validator.factory";


import ProductInterface from "./product.interface";

export default class ProductB extends Entity implements ProductInterface{
    private _id: string; 
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get id (): string {
        return this._id;
    }

    get price() {
        return this._price*2;
    }

    changeName(name: string) {
        this._name = name;
        this.validate()
    }

    changePrice(price: number) {
        this._price = price;
        this.validate()
    }

    validate() {
        ProductBYupValidatorFactory.create().validate(this);
    }


}
