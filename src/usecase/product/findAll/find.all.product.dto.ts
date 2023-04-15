type Product = {
    id: string;
    name: string;
    price: number;
}

export interface FindAllProductDto {
    products: Product[];
}