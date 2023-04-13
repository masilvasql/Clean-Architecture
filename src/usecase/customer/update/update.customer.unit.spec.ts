import { v4 } from "uuid";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";

const customer = CustomerFactory.createWithAddress(
    "John",
    new Address("Street", 123, "Zip", "City", "Country")
  );
  
const input = {
    id: expect.any(String),
    name: "John 2",
    address: {
        street: "Street 2" ,
        number: 1234,
        city: "city 2",
        zip: "zip 2",
        country: "Country 2"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}


describe("Update Customer UNIT TEST", () => {
    it("should update a customer", async ()=>{
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        
        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input)
    })

    it("should throw an error if customer not found", async ()=>{
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found")
        })

        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Customer not found")
    })
});