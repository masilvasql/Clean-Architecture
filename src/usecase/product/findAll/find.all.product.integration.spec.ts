import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../ifrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../ifrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import FindAllProductUseCase from "./find.all.prduct.usecase";


const p1 = ProductFactory.create("A", "Produto1", 12.99);
const p2 = ProductFactory.create("B", "Produto2", 13.99);

describe("INTEGRATION TEST Find All Product Use Case", () => {
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

    it("should find all products", async () => {
            
            const productRepository = new ProductRepository();
            const useCaseCreate = new CreateProductUseCase(productRepository);
            const outputCreate = await useCaseCreate.execute(p1);
            const outputCreate2 = await useCaseCreate.execute(p2);
    
            const useCaseFind = new FindAllProductUseCase(productRepository);
            const outputFind = await useCaseFind.execute();
    
            expect(outputFind.products.length).toEqual(2);

            expect(outputFind.products[0].name).toEqual(p1.name);
            expect(outputFind.products[0].price).toEqual(p1.price);

            expect(outputFind.products[1].name).toEqual(p2.name);
            expect(outputFind.products[1].price).toEqual(p2.price);
            
    })
})