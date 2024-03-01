export interface ProductType {
    id: string;
    product: string;
    brand: string;
    price: number
}

export interface ProductsSchema {
    result: Array<ProductType>;
    error?: string;
    isLoaded: boolean;
    isFiltered: boolean;
} 

export interface ProductIdsSchema {
    result: Array<string>;
}