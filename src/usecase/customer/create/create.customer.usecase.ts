import { v4 } from "uuid";
import Customer from "../../../domain/customer/entity/customer";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";

export default class CreateCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface

    constructor(repository: CustomerRepositoryInterface) {
        this.customerRepository = repository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {

        const customer = CustomerFactory.createWithAddress(input.name,
            new Address(
                input.Address.street,
                input.Address.number,
                input.Address.city,
                input.Address.zip,
                input.Address.country
            )
        );

        await this.customerRepository.create(customer)

        const output: OutputCreateCustomerDto = {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zipCode,
                country: customer.Address.country
            }
        }
        return output;
    }

}