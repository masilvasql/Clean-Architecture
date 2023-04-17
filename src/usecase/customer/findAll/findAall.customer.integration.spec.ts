import { Sequelize } from "sequelize-typescript";
import FindAllCustomerUseCase from "./findAll.customer.usecase";
import CustomerModel from "../../../ifrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../ifrastructure/customer/repository/sequelize/customer.repository";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

describe("INTEGRATION Test Find All Customer Use Case", () => {

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
    it("should find all customers", async () => {
        const input = {};

        const customerRepository = new CustomerRepository();
        const usecase = new FindAllCustomerUseCase(customerRepository);
        
        const custmer1 = CustomerFactory.createWithAddress("John", new Address("Street", 123, "city", "zip", "Country"));
        await customerRepository.create(custmer1);
    
        const custmer2 = CustomerFactory.createWithAddress("Mark", new Address("Street 2", 1234, "city 2", "zip 2", "Country 2"));
        await customerRepository.create(custmer2);

       
        const result = await usecase.execute(input);
        
        expect(result.customers.length).toEqual(2);

        
        
        expect(result.customers[0].name).toEqual(custmer1.name);
        expect(result.customers[0].address.street).toEqual(custmer1.Address.street);
        expect(result.customers[0].address.number).toEqual(custmer1.Address.number);
        expect(result.customers[0].address.city).toEqual(custmer1.Address.city);
        expect(result.customers[0].address.zip).toEqual(custmer1.Address.zipCode);
        expect(result.customers[0].address.country).toEqual(custmer1.Address.country);

        
        expect(result.customers[1].name).toEqual(custmer2.name);
        expect(result.customers[1].address.street).toEqual(custmer2.Address.street);
        expect(result.customers[1].address.number).toEqual(custmer2.Address.number);
        expect(result.customers[1].address.city).toEqual(custmer2.Address.city);
        expect(result.customers[1].address.zip).toEqual(custmer2.Address.zipCode);
        expect(result.customers[1].address.country).toEqual(custmer2.Address.country);

        



    });
})