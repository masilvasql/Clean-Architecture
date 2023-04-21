import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";

import * as yup from "yup";

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(customer: Customer): void {
        try {
            const schema = yup.object().shape(
                {
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required"),
                }
            );

            schema.validateSync(
                {
                    id: customer.id,
                    name: customer.name,
                },
                {
                    abortEarly: false
                }
            );

        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.inner.forEach((error) => {
                customer.notification.addError({
                    context: "Customer",
                    message: error.message,
                });
            })
        }
    }
}