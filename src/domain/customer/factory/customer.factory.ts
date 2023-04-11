import { v4 } from "uuid";
import Customer from "../entity/customer";
import CustomerInterface from "../entity/customer.interface";
import Address from "../value-object/address";

export default class CustomerFactory{
    public static create(name: string): CustomerInterface{
        let id = v4();
        return new Customer(id, name);
    }

    public static createWithAddress(name: string, address: Address): CustomerInterface{
        let customer = CustomerFactory.create(name);
        customer.changeAddress(address);
        return customer;
    }
}