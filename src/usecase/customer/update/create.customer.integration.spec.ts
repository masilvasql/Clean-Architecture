import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../ifrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../ifrastructure/customer/repository/sequelize/customer.repository";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe('INTEGRATION Test Find Customer Use Case', () => {
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

    it("should update a customer", async () => {
    
        const customerRepository = new CustomerRepository();

        const customer = CustomerFactory.createWithAddress("John", new Address("Street", 123, "city", "zip", "Country"));

        await customerRepository.create(customer);

        customer.changeName("Jonh Alterado");
        customer.changeAddress(new Address("Street Alterada", 1234, "city alterada", "zip alterada ", "Country alterada"));

        const usecase = new UpdateCustomerUseCase(customerRepository);

        const output = {
            id: customer.id,
            name: "Jonh Alterado",
            address: {
                street: "Street Alterada",
                city: "city alterada",
                number: 1234,
                zip: "zip alterada",
                country: "Country alterada"
            }
        }

        const result = await usecase.execute(output);

        expect(result).toEqual(output)
    
    })

    it("should throw an error if customer not found", async ()=>{
        const customerRepository = new CustomerRepository();
        
        const input = {
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

        

        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Customer not found")
    })

})