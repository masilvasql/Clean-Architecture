import Product from "./Products";

describe("Product unit tests", () => {

    it("should throw error when Id is empty", () => {
        expect(() => new Product("", "Produto 1", 100)).toThrowError("Product: Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => new Product("1", "", 100)).toThrowError("Product: Name is required");
    });

    it("should throw error when price is less or equal zero", () => {
        expect(() => new Product("1", "Produto 1", 0)).toThrowError("Product: Price must be greater than zero");
    });

    it("should change the name of the product", () => {
        const product = new Product("1", "Produto 1", 100);
        product.changeName("Produto 2");
        expect(product.name).toBe("Produto 2");
    });

    it("should change price of the product", () => {
        const product = new Product("1", "Produto 1", 100);
        product.changePrice(200);
        expect(product.price).toBe(200);
    })

    it("should get all erros", () => {
        expect(() => new Product("", "", 0)).toThrowError("Product: Id is required, Product: Name is required, Product: Price must be greater than zero");
    })

})