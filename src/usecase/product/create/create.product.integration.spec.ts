import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../ifrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../ifrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

let input = ProductFactory.create("A", "Produto1", 12.99);

describe("INTEGRATION TEST Create Product Use Case", () => {

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

    it("should create a product", async () => {
        
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);
        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })

        

    })


})