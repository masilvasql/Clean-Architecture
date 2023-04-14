import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import { InputListCustomerDto } from "./findAll.customer.dto";
import FindAllCustomerUseCase from "./findAll.customer.usecase";


const customer = CustomerFactory.createWithAddress("user 1", new Address("street", 123, "zip", "city", "country"));
const cutomer2 = CustomerFactory.createWithAddress("user 2", new Address("street", 123, "zip", "city", "country"));
const cutomer3 = CustomerFactory.createWithAddress("user 3", new Address("street", 123, "zip", "city", "country"));

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer, cutomer2, cutomer3])),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}


describe('UNIT Test Find Customer Use Case', () => {
    it("should find all customers", async ()=>{
        const customerRepository = MockRepository();
        const findAllCustomerUseCase = new FindAllCustomerUseCase(customerRepository);

        const output = await findAllCustomerUseCase.execute({});

        

        expect(output.customers.length).toEqual(3)
        expect(output.customers[0].id).toEqual(customer.id)
        expect(output.customers[0].name).toEqual(customer.name)
        expect(output.customers[0].address.street).toEqual(customer.Address.street)
        expect(output.customers[0].address.city).toEqual(customer.Address.city)
        expect(output.customers[0].address.number).toEqual(customer.Address.number)
        expect(output.customers[0].address.zip).toEqual(customer.Address.zipCode)
        expect(output.customers[0].address.country).toEqual(customer.Address.country)
        expect(output.customers[1].id).toEqual(cutomer2.id)
        expect(output.customers[1].name).toEqual(cutomer2.name)
        expect(output.customers[1].address.street).toEqual(cutomer2.Address.street)
        expect(output.customers[1].address.city).toEqual(cutomer2.Address.city)
        expect(output.customers[1].address.number).toEqual(cutomer2.Address.number)
        expect(output.customers[1].address.zip).toEqual(cutomer2.Address.zipCode)
        expect(output.customers[1].address.country).toEqual(cutomer2.Address.country)
        expect(output.customers[2].id).toEqual(cutomer3.id)
        expect(output.customers[2].name).toEqual(cutomer3.name)
        expect(output.customers[2].address.street).toEqual(cutomer3.Address.street)
        expect(output.customers[2].address.city).toEqual(cutomer3.Address.city)
        expect(output.customers[2].address.number).toEqual(cutomer3.Address.number)
        expect(output.customers[2].address.zip).toEqual(cutomer3.Address.zipCode)
        expect(output.customers[2].address.country).toEqual(cutomer3.Address.country)




        
    
    })
})