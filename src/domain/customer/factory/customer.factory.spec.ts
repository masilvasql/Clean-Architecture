import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("CustomerFactory Unit Test", ()=>{
    it("should create a customer", ()=>{
        let customer = CustomerFactory.create("John Doe");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.Address).toBeUndefined();
    })

    it("should create a customer with address", ()=>{
        let address = new Address("rua1", 123, "cidade1", "12345678", "Brasil")
        let customer = CustomerFactory.createWithAddress("John Doe", address);
      

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.Address).toBe(address);
    })

})