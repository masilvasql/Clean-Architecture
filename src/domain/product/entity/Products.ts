import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductYupValidatorFactory from "../factory/product.validator.factory copy";

import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface{
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors());
        }
    }

    get name(): string {
        return this._name;
    }

    get id (): string {
        return this._id;
    }

    get price() {
        return this._price;
    }

    changeName(name: string) {
        this._name = name;
        this.validate()
        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors());
        }
    }

    changePrice(price: number) {
        this._price = price;
        this.validate()
        if(this.notification.hasErrors()) {

            throw new NotificationError(this.notification.errors());
        }
    }

    validate() {
        
        ProductYupValidatorFactory.create().validate(this);
    }


}
