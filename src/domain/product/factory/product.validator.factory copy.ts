import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/Products";
import ProductYupValidator from "../validator/product.yup.validator";

export default class ProductYupValidatorFactory {
    static create(): ValidatorInterface<Product> {
        return new ProductYupValidator();
    }
}

