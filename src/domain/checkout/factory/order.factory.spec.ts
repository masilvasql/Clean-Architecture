import { v4 } from "uuid"
import OrderFactory from "./order.factory"

describe("OrderFactory Unit Test", ()=>{
    
    it("should create an order", ()=>{
        const orderProps = {
            id: v4(),
            customerID: v4(),
            items: [
                {
                    id: v4(),
                    price: 10,
                    quantity: 1,
                    name:"OrderItem 1",
                    productId:v4()
                },
                {
                    id: v4(),
                    price: 20,
                    quantity: 2,
                    name:"OrderItem 1",
                    productId:v4()
                }
            ]
        }

        const order =  OrderFactory.create(orderProps)

        expect(order.id).toBe(orderProps.id);
        expect(order.customerID).toBe(orderProps.customerID);
        expect(order.items.length).toBe(2);
        expect(order.total()).toBe(50);  

        

    })
})