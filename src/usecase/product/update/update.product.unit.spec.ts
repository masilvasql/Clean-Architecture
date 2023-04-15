import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./upodate.product.usecase";


const input = ProductFactory.create("A", "Produto1", 12.99)

const product = ProductFactory.create("A", "Product A", 10.00);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}


describe("UNIT TEST: Update Product", () => {
    it("should update a product", async () => {

        const productRepository = MockRepository()
        const useCase = new UpdateProductUseCase(productRepository)
        const output = await useCase.execute(input)
        expect(output).toEqual({
            id:expect.any(String),
            name:input.name,
            price:input.price
        })
    })

    it("should throw an error if product not found", async () => {
        const productRepository = MockRepository()
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found")
        })
        const useCase = new UpdateProductUseCase(productRepository)
        await expect(useCase.execute(input)).rejects.toThrow("Product not found")
    })
});