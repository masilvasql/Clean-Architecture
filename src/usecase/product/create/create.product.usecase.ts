
import Product from "../../../domain/product/entity/Products";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase{
    private productRepository:ProductRepositoryInterface;

    constructor(productRepository:ProductRepositoryInterface){
        this.productRepository = productRepository
    }

    async execute(input:InputCreateProductDto):Promise<OutputCreateProductDto>{

        const product = new Product(input.id, input.name, input.price)

        await this.productRepository.create(product)

        const output: OutputCreateProductDto = {
            id: product.id,
            name:product.name,
            price: product.price
        }
        return output
    }
}