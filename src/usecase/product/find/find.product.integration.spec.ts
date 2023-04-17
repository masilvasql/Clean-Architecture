import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../ifrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../ifrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "../create/create.product.usecase";
import { FindProductUseCase } from "./find.product.usecase";
import { InputFindProductDto } from "./find.product.dto";

const product = ProductFactory.create("A", "Produto1", 12.99);

describe("INTEGRATION TEST Find Product Use Case", () => {
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

    it("should find a product", async () => {
        
        const productRepository = new ProductRepository();
        const useCaseCreate = new CreateProductUseCase(productRepository);
        const outputCreate = await useCaseCreate.execute(product);

        const useCaseFind = new FindProductUseCase(productRepository);
        const input : InputFindProductDto ={
            id: outputCreate.id
        }
        const outputFind = await useCaseFind.execute(input);

        expect(outputFind).toEqual({
            id: expect.any(String),
            name: product.name,
            price: product.price
        })
    
    })
})