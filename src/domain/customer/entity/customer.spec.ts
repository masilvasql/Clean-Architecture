import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when Id is empty", () => {
        expect(() => new Customer("", "John")).toThrowError("Customer: Id is required");
    });


    it("should throw error when Name is empty", () => {
        expect(() => new Customer("1", "")).toThrowError("Customer: Name is required");
    })

    it("should change name", () => {
        //arrange
        const customer = new Customer("1", "John")
        //act
        customer.changeName("John Doe")
        
        //assert
        expect(customer.name).toBe("John Doe")
    })

    it("should activate customer", () => {
        //arrange
        const customer = new Customer("1", "John")
        const addres = new Address("street", 1, "city", "zipCode", "country")
        //act
        customer.Address = addres
        customer.activate()
        //assert
        expect(customer.isActive()).toBe(true)
    })

    it("should deactivate customer", () => {
        //arrange
        const customer = new Customer("1", "John")
        customer.deactivate()
        //assert
        expect(customer.isActive()).toBe(false)
    })

    it("should thrrow error when change name to empty", () => {
        
        expect(() => new Customer("1", "John").changeName("")).toThrowError("Customer: Name is required");
    })

    it("should throw error when activate customer without address", () => {
        expect(() => new Customer("1", "John").activate()).toThrowError("Address is mandatory to activate a customer")
    })

    it("should add reward points", () => {	
        
        const customer = new Customer("1", "John");
        expect(customer.rewardPoints).toBe(0);
        
        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(100);
    
    })

});