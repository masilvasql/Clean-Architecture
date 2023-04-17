import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../ifrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../ifrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Test Find Customer Use Case', () => {

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


    it("should find a customer", async () => {


        const customer = new Customer("123", "John")
        const addres = new Address("Street", 123, "city", "zip", "Country");
        customer.changeAddress(addres);
        const customerRepository = new CustomerRepository();
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


})