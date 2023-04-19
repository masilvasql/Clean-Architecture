import { Router, Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "../../../usecase/customer/create/create.customer.dto";
import FindAllCustomerUseCase from "../../../usecase/customer/findAll/findAll.customer.usecase";


export const customerRoutes = Router();

customerRoutes.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const customerDTO: InputCreateCustomerDto = {
            name: req.body.name,
            Address: {
                street: req.body.address.street,
                number: req.body.address.number,
                city: req.body.address.city,
                zip: req.body.address.zipCode,
                country: req.body.address.country
            }
        }
        const output: OutputCreateCustomerDto = await useCase.execute(customerDTO);
        res.status(201).json(output);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});


customerRoutes.get("/", async (req: Request, res: Response) => {
    const useCase = new FindAllCustomerUseCase(new CustomerRepository());
    try {
        const output = await useCase.execute({});
        res.status(200).json(output);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});
