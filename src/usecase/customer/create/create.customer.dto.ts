export interface InputCreateCustomerDto{
    name: string;
    Address: {
        street: string;
        number: number;
        city: string;
        zip: string;
        country: string;
    }
}

export interface OutputCreateCustomerDto{
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        city: string;
        zip: string;
        country: string;
    }
}