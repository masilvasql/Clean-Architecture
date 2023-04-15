
import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}

let input = ProductFactory.create("A", "Produto1", 12.99);


describe("UNIT TEST: Create Product", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository()
        const useCase = new CreateProductUseCase(productRepository)
        const output = await useCase.execute(input)
        expect(output).toEqual({
            id:input.id,
            name:input.name,
            price:input.price
        })
    })

});