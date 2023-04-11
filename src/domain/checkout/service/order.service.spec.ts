import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/orderItem"
import OrderService from "./order.service"

describe("Order service unit tests", ()=>{
    it("should get total of all orders", ()=>{
      const item1 = new OrderItem("1", "Item 1", 100, "p1", 1)
      const item2 = new OrderItem("2", "Item 2", 300, "p1", 2)
      const itemm3 = new OrderItem("3", "Item 3", 100, "p1", 1)
 
      const order = new Order("01", "c1", [item1, item2])
      const order2 = new Order("o2", "c1", [itemm3])

      const total = OrderService.calculateTotal([order, order2])
      
 
        expect(total).toBe(800)
    })

    it("should place an order", ()=>{
      
      const customer = new Customer("c1", "customer 1");
      const item1 = new OrderItem("1", "Item 1", 100, "p1", 1)

      const order = OrderService.placeOrder(customer, [item1]);
      expect(customer.rewardPoints).toBe(50)
      expect(order.total()).toBe(100)
    })
})