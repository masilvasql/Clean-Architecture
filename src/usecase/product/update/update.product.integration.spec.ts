import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../ifrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../ifrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./upodate.product.usecase";

const product =ProductFactory.create("A", "Produto1", 12.99);

describe("INTEGRATION TEST Update Product Use Case", () => {
    let sequelize: Sequelize;



    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {

    
        const productRepository = new ProductRepository();
        const useCaseCreate = new CreateProductUseCase(productRepository);
        const outputCreate = await useCaseCreate.execute(product);

        const useCaseUpdate = new UpdateProductUseCase(productRepository);
        product.changeName("Produto2");
        const outputUpdate = await useCaseUpdate.execute(product);

        expect(outputUpdate).toEqual({
            id: expect.any(String),
            name: "Produto2",
            price: product.price
        })
    
    })

    it("should throw an error if product not found", async () => {
        const productRepository = new ProductRepository()
      
        const useCase = new UpdateProductUseCase(productRepository)
        await expect(useCase.execute(product)).rejects.toThrow("Product not found")
    })

    
})