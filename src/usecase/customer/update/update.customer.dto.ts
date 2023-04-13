export interface InputUpdateCustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zip: string;
        country:string;
    }
}

export interface OutputUpdateCustomerDto {
    id: string;
    name: string;
    address: {
        street: string;
        city: string;
        number: number;
        zip: string;
        country:string;
    }
}