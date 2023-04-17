import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export class FindProductUseCase{
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.productRepository.find(input.id);

        const output: OutputFindProductDto = {
            id: product.id,
            name: product.name,
            price: product.price
        }

        return output;
    }
}