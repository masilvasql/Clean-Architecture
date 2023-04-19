import { app, sequelize } from '../express'
import request from 'supertest'

describe("E2E test for Customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true }) //Force true drops all tables and recreates them
    })

    afterAll(async () => {
        await sequelize.close() //Close connection to database
    })

    it("should create a customer", async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: "John Doe",
                address: {
                    street: "Street 1",
                    number: 1,
                    city: "City 1",
                    zipCode: "ZipCode 1",
                    country: "Country 1"
                }
            });
            console.log(response.body)
        expect(response.status).toBe(201)
        expect(response.body.name).toBe("John Doe")
        expect(response.body.address.street).toBe("Street 1")
        expect(response.body.address.number).toBe(1)
        expect(response.body.address.city).toBe("City 1")
        expect(response.body.address.zip).toBe("ZipCode 1")
        expect(response.body.address.country).toBe("Country 1")
    })

    it("should not create a customer", async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: "John Doe",
            });
        expect(response.status).toBe(500)
    })

    it("should list all customers", async () => {

        const response = await request(app)
            .post('/customer')
            .send({
                name: "John Doe",
                address: {
                    street: "Street 1",
                    number: 1,
                    city: "City 1",
                    zipCode: "ZipCode 1",
                    country: "Country 1"
                }
            });
            console.log(response.body)
        expect(response.status).toBe(201)

        const response2 = await request(app)
            .post('/customer')
            .send({
                name: "Marcelo",
                address: {
                    street: "Street 1",
                    number: 1,
                    city: "City 1",
                    zipCode: "ZipCode 1",
                    country: "Country 1"
                }
            });
            console.log(response.body)
        expect(response.status).toBe(201)

        const response3 = await request(app)
            .get('/customer')
            .send();
        expect(response3.status).toBe(200)
        expect(response3.body.customers.length).toBe(2)

        expect(response3.body.customers[0].name).toBe("John Doe")
        expect(response3.body.customers[0].address.street).toBe("Street 1")
        expect(response3.body.customers[0].address.number).toBe(1)
        expect(response3.body.customers[0].address.city).toBe("City 1")
        expect(response3.body.customers[0].address.zip).toBe("ZipCode 1")
        expect(response3.body.customers[0].address.country).toBe("Country 1")

        expect(response3.body.customers[1].name).toBe("Marcelo")
        expect(response3.body.customers[1].address.street).toBe("Street 1")
        expect(response3.body.customers[1].address.number).toBe(1)
        expect(response3.body.customers[1].address.city).toBe("City 1")
        expect(response3.body.customers[1].address.zip).toBe("ZipCode 1")
        expect(response3.body.customers[1].address.country).toBe("Country 1")
        
    })

})