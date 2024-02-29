export type ProductType = {
    id: string;
    product: string;
    brand: string;
    price: number
}

export interface ProductsSchema {
    result: Array<ProductType>;
    totalCount: number;
    error?: string;
    isLoaded: boolean;
} 

export interface ProductIdsSchema {
    result: Array<string>;
}