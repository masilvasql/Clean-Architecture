import Product from "../../../domain/product/entity/Products"
import ProductFactory from "../../../domain/product/factory/product.factory"
import FindAllProductUseCase from "./find.all.prduct.usecase";
import { FindAllProductDto } from "./find.all.product.dto"

const p1 = ProductFactory.create("A", "Produto1", 10);
const p2 = ProductFactory.create("A", "Produto2", 20);
const p3 = ProductFactory.create("A", "Produto3", 30);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([p1, p2, p3])),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    }
}



describe("UNIT TEST: Find All Products", () => {
    it("should return a list of products", async () => {
        const productRepository = MockRepository()
        const useCase = new FindAllProductUseCase(productRepository)
        const output = await useCase.execute()
        
        expect(output.products.length).toEqual(3)

        expect(output.products[0].id).toEqual(p1.id)
        expect(output.products[0].name).toEqual(p1.name)
        expect(output.products[0].price).toEqual(p1.price)

        expect(output.products[1].id).toEqual(p2.id)
        expect(output.products[1].name).toEqual(p2.name)
        expect(output.products[1].price).toEqual(p2.price)

        expect(output.products[2].id).toEqual(p3.id)
        expect(output.products[2].name).toEqual(p3.name)
        expect(output.products[2].price).toEqual(p3.price)



    })
})