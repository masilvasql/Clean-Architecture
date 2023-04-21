import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductB from "../entity/Product-B";
import Product from "../entity/Products";

import * as yup from "yup";

export default class ProductBYupValidator implements ValidatorInterface<ProductB>{
    validate(product: ProductB): void {
       try{
            const schema = yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                price: yup.number().positive("Price must be greater than zero").required("Price must be greater than zero"),
            });

            schema.validateSync(
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                },
                {
                    abortEarly: false
                }
            );
       } catch(errors){
            const e = errors as yup.ValidationError;
            e.inner.forEach((error) => {
                product.notification.addError({
                    context: "Product",
                    message: error.message,
                });
            })
       }
    }
}