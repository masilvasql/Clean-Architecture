import { app, sequelize } from "../express"
import request from "supertest"

describe("E2E test for Product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true }) //Force true drops all tables and recreates them
    })

    afterAll(async () => {
        await sequelize.close() //Close connection to database
    })

    it("should create a product", async () => {
        const response = await request(app)
        .post("/product")
        .send({
            type:"A",
            name: "Product 1",
            price: 10
        })

        expect(response.status).toBe(201)
        expect(response.body.name).toBe("Product 1")
        expect(response.body.price).toBe(10)
        expect(response.body).toHaveProperty("id")
    })


    it("should list all products", async () => {

        const responseCreate = await request(app)
        .post("/product")
        .send({
            type:"A",
            name: "Product 1",
            price: 10
        })
        
        expect(responseCreate.status).toBe(201)
        expect(responseCreate.body.name).toBe("Product 1")
        expect(responseCreate.body.price).toBe(10)
        expect(responseCreate.body).toHaveProperty("id")
        
        const responseCreate2 = await request(app)
        .post("/product")
        .send({
            type:"B",
            name: "Product B",
            price: 100
        })

        expect(responseCreate2.status).toBe(201)
        expect(responseCreate2.body.name).toBe("Product B")
        expect(responseCreate2.body.price).toBe(200)
        expect(responseCreate2.body).toHaveProperty("id")
        

        const response = await request(app)
        .get("/product")
        .send()

        expect(response.status).toBe(200)
        expect(response.body.products.length).toBe(2)

        expect(response.body.products[0].name).toBe("Product 1")
        expect(response.body.products[0].price).toBe(10)
        expect(response.body.products[0]).toHaveProperty("id")

        expect(response.body.products[1].name).toBe("Product B")
        expect(response.body.products[1].price).toBe(200)
        expect(response.body.products[1]).toHaveProperty("id")



    })
})