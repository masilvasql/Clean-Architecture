import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../ifrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../ifrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";
import Customer from "../../../domain/customer/entity/customer";
import { InputCreateCustomerDto } from "./create.customer.dto";

const input: InputCreateCustomerDto = {
    name: "John",
    Address: {
        street: "Street",
        city: "city",
        number: 123,
        zip: "zip",
        country: "Country"
    }
}

describe("INTEGRATION Test Create Customer Use Case", () => {
    
        let sequelize: Sequelize;

        beforeEach(async () => {
            sequelize = new Sequelize({
                dialect: "sqlite",
                storage: ":memory:",
                logging: false,
                sync: { force: true },
            });

            await sequelize.addModels([CustomerModel]);
            await sequelize.sync();
        });

        afterEach(async () => {
            await sequelize.close();
        });
        it("should create a customer", async () => {
            
            
            

            const customerRepository = new CustomerRepository();
            const usecase = new CreateCustomerUseCase(customerRepository);

            const output = {
                id: expect.any(String),
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

        it("should throw an error when name is missing", async () => {
            const customerRepository = new CustomerRepository();
            const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
            input.name = ""
           
    
            expect(async () => {
                return customerCreateUseCase.execute(input)
            }).rejects.toThrow("Name is required")
        })
    
        it("should throw an error when street is missing", async () => {
            const customerRepository = new CustomerRepository();
            const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
            input.Address.street = ""
    
            expect(async () => {
                return customerCreateUseCase.execute(input)
            }).rejects.toThrow("Street is Required")
        })
    })
