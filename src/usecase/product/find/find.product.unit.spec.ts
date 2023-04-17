import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputFindProductDto } from "./find.product.dto";
import { FindProductUseCase } from "./find.product.usecase";


const input = ProductFactory.create("A", "Produto1", 12.99)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(input)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}


describe("UNIT TEST: Find Product", () => {
    it ("should find a product", async () => {
        const productRepository = MockRepository();
        const useCase = new FindProductUseCase(productRepository);
        const inputDto: InputFindProductDto  = {
            id: input.id
        }
        const output = await useCase.execute(inputDto);
        expect(output).toEqual({
            id:input.id,
            name:input.name,
            price:input.price
        })
    })
});