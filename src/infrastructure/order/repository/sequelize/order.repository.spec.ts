import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/orderItem";

import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/Products";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";


import OrderRepository from "./order.repository";


describe("order repository unit tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create an order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("street", 1, "zipcode", "city", "country");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepositoryt = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepositoryt.create(product);


        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const orderRepository = new OrderRepository();
        const order = new Order("123", customer.id, [orderItem]);
        await orderRepository.create(order);


        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: [OrderItemModel] });
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            order_items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    product_id: orderItem.productID,
                    order_id: "123"
                }
            ]
        });
    });

    it("should update an order", async () => {

        const customerRepository = new CustomerRepository();
        let customer = new Customer("123", "Customer 1");
        let address = new Address("street", 1, "zipcode", "city", "country");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        let productRepositoryt = new ProductRepository();
        let product = new Product("123", "Product 1", 10);
        await productRepositoryt.create(product);


        let orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        let orderRepository = new OrderRepository();
        let order = new Order("123", customer.id, [orderItem]);
        await orderRepository.create(order);


        let orderModel = await OrderModel.findOne({ where: { id: order.id }, include: [OrderItemModel] });
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            order_items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    product_id: orderItem.productID,
                    order_id: "123"
                }
            ]
        });

        customer.changeName("Customer 2");
        address = new Address("street 2", 2, "zipcode 2", "city 2", "country 2");
        customer.changeAddress(address);

        orderItem = new OrderItem("2", product.name, product.price, product.id, 3);
        order = new Order("123", customer.id, [orderItem]);
        await orderRepository.update(order);

        orderModel = await OrderModel.findOne({ where: { id: order.id }, include: [OrderItemModel] });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            order_items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    product_id: orderItem.productID,
                    order_id: "123"
                }
            ]
        });

    })

    it("should find an order", async () => {

        const customerRepository = new CustomerRepository();
        let customer = new Customer("123", "Customer 1");
        let address = new Address("street", 1, "zipcode", "city", "country");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        let productRepositoryt = new ProductRepository();
        let product = new Product("123", "Product 1", 10);
        await productRepositoryt.create(product);


        let orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        let orderRepository = new OrderRepository();
        let order = new Order("123", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderModel = await orderRepository.find(order.id);
        expect(orderModel).toStrictEqual(order);

    })

    it("should find All Orders", async ()=>{

        const customerRepository = new CustomerRepository();
        let customer = new Customer("123", "Customer 1");
        let address = new Address("street", 1, "zipcode", "city", "country");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        let productRepositoryt = new ProductRepository();
        let product = new Product("123", "Product 1", 10);
        await productRepositoryt.create(product);


        let orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        let orderRepository = new OrderRepository();
        let order = new Order("123", customer.id, [orderItem]);
        await orderRepository.create(order);

        const customerRepository2 = new CustomerRepository();
        let customer2 = new Customer("1234", "Customer 12");
        let address2 = new Address("street", 1, "zipcode", "city", "country");
        customer2.changeAddress(address2);
        await customerRepository2.create(customer2);

        let productRepositoryt2 = new ProductRepository();
        let product2 = new Product("1234", "Product 2", 10);
        await productRepositoryt2.create(product2);


        let orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 2);
        let orderRepository2 = new OrderRepository();
        let order2 = new Order("1234", customer2.id, [orderItem2]);
        await orderRepository2.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toStrictEqual([order, order2]);

    })


});