import { StateSchema } from "app/providers/StoreProvider";

export const getProductsIsLoaded = (state: StateSchema) => state.products.isLoaded;