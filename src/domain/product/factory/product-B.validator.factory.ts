import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductB from "../entity/Product-B";
import ProductBYupValidator from "../validator/product-B.yup.validator";


export default class ProductBYupValidatorFactory {
    static create(): ValidatorInterface<ProductB> {
        return new ProductBYupValidator();
    }
}

