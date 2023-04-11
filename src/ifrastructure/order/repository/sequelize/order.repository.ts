import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/orderItem";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";


export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {

        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerID,
            total: entity.total(),
            order_items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productID,
                quantity: item.quantity
            }))
        },
            {
                include: [{ model: OrderItemModel }]
            },)


    }
    async update(entity: Order): Promise<void> {

        await OrderModel.update({
            customer_id: entity.customerID,
            total: entity.total(),
        }, {
            where: { id: entity.id }
        })

        await OrderItemModel.destroy({
            where: { order_id: entity.id }
        })

        await OrderItemModel.bulkCreate(entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productID,
            quantity: item.quantity,
            order_id: entity.id
        })))



    }
    async find(id: string): Promise<Order> {
        const found  =  await OrderModel.findOne({ where: { id: id }, include: [ OrderItemModel ] });
        const order = new Order(found.id, found.customer_id, found.order_items.map((item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)))
        return order;
    }
    async findAll(): Promise<Order[]> {
        const found = await OrderModel.findAll({ include: [OrderItemModel] });
        const orders = found.map((order) => new Order(
            order.id, 
            order.customer_id, 
            order.order_items.map((item) => 
                new OrderItem(
                    item.id, 
                    item.name, 
                    item.price, 
                    item.product_id, 
                    item.quantity
                )))) 

        return orders;
    }
}