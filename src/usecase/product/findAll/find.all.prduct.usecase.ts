import Product from "../../../domain/product/entity/Products";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { FindAllProductDto } from "./find.all.product.dto";

export default class FindAllProductUseCase {
    private readonly productRepository: ProductRepositoryInterface;
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }
    async execute(): Promise<FindAllProductDto> {
        const products = await this.productRepository.findAll();
        const output = OutputMapper.toOutput(products);
        return output;
    }
}

class OutputMapper {
    static toOutput(products: Product[]): FindAllProductDto {
        return {
            products: products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price
                }
            })
        }
    }
}