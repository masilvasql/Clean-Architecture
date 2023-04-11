import Order from "./order";
import OrderItem from "./orderItem";

describe("Order unit tests", () => {
    it("should throw error when Id is empty", () => {
        expect(() => new Order("", "1", [new OrderItem("1", "item1", 10, "p1", 1)])).toThrowError("Id is Required");
    });

    it("should throw error when CustomerID is empty", () => {
        expect(() => new Order("1", "", [new OrderItem("1", "item1", 10, "p1", 1)])).toThrowError("CustomerID is Required");
    });

    it("should throw error when OrderItens is empty", () => {
        expect(() => new Order("1", "1", [])).toThrowError("Order without items");
    });

    it("should calculate total", () => {
        const order = new Order("1", "1", [
            new OrderItem("1", "item1", 10, "p1", 1),
            new OrderItem("2", "item2", 10, "p2", 1),
            new OrderItem("3", "item3", 10, "p3", 1),
        ]);
        expect(order.total()).toBe(30);
    });

    it("should throw error if the item quantity is less or  equal  0", () => {

        expect(() => {
            const order = new Order("1", "1", [
                new OrderItem("1", "item1", 10, "p1", 1),
                new OrderItem("2", "item2", 10, "p2", 0),
                new OrderItem("3", "item3", 10, "p3", -1),
            ]);
        }).toThrowError("Quantity must be greater than zero");
    });
});