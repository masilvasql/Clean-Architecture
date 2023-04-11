import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export default class FindCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        const result = await this.customerRepository.find(input.id)

        return {
            id: result.id,
            name: result.name,
            address: {
                street: result.Address.street,
                city: result.Address.city,
                number: result.Address.number,
                zip: result.Address.zipCode,
                country: result.Address.country
            }
        }
    }
}