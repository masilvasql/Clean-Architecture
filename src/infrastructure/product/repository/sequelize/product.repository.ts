import Product from "../../../../domain/product/entity/Products";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";



export default class ProductRepository implements ProductRepositoryInterface {

   
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
            
        });
    }

    async update(product: Product): Promise<void> {
        await ProductModel.update({
            name: product.name,
            price: product.price,
        }, {
            where: {
                id: product.id,
            },
        });
    }

    async find (id: string): Promise<Product> {
        let product = await ProductModel.findOne({
            where: {
                id: id,
            },
        });

        if (product === null) {
            throw new Error("Product not found");
        }

        return new Product(product.id, product.name, product.price);
        
    }

    async findAll(): Promise<Product[]> {
        let products = await ProductModel.findAll();
        return products.map((product) => new Product(product.id, product.name, product.price));
    }
    
}

