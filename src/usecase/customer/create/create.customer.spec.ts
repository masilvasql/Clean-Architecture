import { v4 } from "uuid"
import Customer from "../../../domain/customer/entity/customer"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "../find/find.customer.usecase";
import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John",
    Address: {
        street: "Street",
        number: 123,
        city: "city",
        zip: "zip",
        country: "Country"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}

describe("Create Customer unit test", () => {
    it("should create a customer", async () => {

        const customerRepository = MockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        const output = await customerCreateUseCase.execute(input)

        expect(output).toEqual(
            {
                id: expect.any(String),
                name: input.name,
                address: {
                    street: input.Address.street,
                    city: input.Address.city,
                    number: input.Address.number,
                    zip: input.Address.zip,
                    country: input.Address.country
                }
            })
    })

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.name = ""
       

        expect(async () => {
            return customerCreateUseCase.execute(input)
        }).rejects.toThrow("Name is required")
    })

    it("should throw an error when street is missing", async () => {
        const customerRepository = MockRepository()
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.Address.street = ""

        expect(async () => {
            return customerCreateUseCase.execute(input)
        }).rejects.toThrow("Street is Required")
    })
})