import { Request, Response, Router } from "express";
import FindAllProductUseCase from "../../../usecase/product/findAll/find.all.prduct.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";


export const productRoutes = Router();

productRoutes.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository());
    try {
        const productFactory = ProductFactory.create(req.body.type, req.body.name, req.body.price);
        const input: InputCreateProductDto = {
            id: productFactory.id,
            name: productFactory.name,
            price: productFactory.price
        }
        const output = await useCase.execute(input);
        res.status(201).json(output);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
})

productRoutes.get("/", async (req: Request, res: Response) => {
    const useCase = new FindAllProductUseCase(new ProductRepository());
    try {
        const output = await useCase.execute();
        res.status(200).json(output);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}); 