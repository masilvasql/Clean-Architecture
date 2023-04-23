import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/findAll/findAll.customer.dto";

export default class CustomerPresenter {
    static toXML(data: OutputListCustomerDto):string {

        const xmlOption = {
            header: true,
            indent: '  ',
            newline: '\n',
            allowEmpty: true,
        }

        const xml = toXML({
            customers: {
                customer: data.customers.map((customer) => ({
                    id:customer.id,
                    name: customer.name,
                    address:{
                        street: customer.address.street,
                        number: customer.address.number,
                        city: customer.address.city,
                        country: customer.address.country,
                        zipCode: customer.address.zip,
                    }
                }))
            }
        }, xmlOption);

        return xml;

    }
}