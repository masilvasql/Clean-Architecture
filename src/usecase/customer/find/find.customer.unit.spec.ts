import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../ifrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../ifrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";


const customer = new Customer("123", "John")
const addres = new Address("Street", 123, "city", "zip", "Country");
customer.changeAddress(addres);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}


describe('UNIT Test Find Customer Use Case', () => {

    it("should fin a customer", async () => {

        const customerRepository = MockRepository();
        await customerRepository.create(customer)

        const input = {
            id: "123"
        }

        const usecase = new FindCustomerUseCase(customerRepository)

        const output = {
            id: "123",
            name: "John",
            address: {
                street: "Street",
                city: "city",
                number: 123,
                zip: "zip",
                country: "Country"
            }
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output)

    })

    it("should throw an error if customer not found", async () => {

        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found")
        })

        const input = {
            id: "123"
        }

        const useCase = new FindCustomerUseCase(customerRepository);
        expect(async () => {
            return useCase.execute(input)
        }).rejects.toThrow("Customer not found")
    })

})