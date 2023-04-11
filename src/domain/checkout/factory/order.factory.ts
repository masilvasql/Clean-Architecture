
import Order from "../entity/order";

import OrderItem from "../entity/orderItem";

interface OrderFactoryProps{
    id:string;
    customerID:string;
    items:{
        id:string;
        name:string;
        productId:string;
        price:number;
        quantity:number;
    }[]
}

export default class OrderFactory{
    public static create(orderProps:OrderFactoryProps): Order{
  
        const items = orderProps.items.map(item => new OrderItem(item.id, item.name, item.price,item.productId, item.quantity))
        return new Order(orderProps.id, orderProps.customerID, items)
    }
}