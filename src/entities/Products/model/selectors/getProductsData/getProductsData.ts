import { StateSchema } from "app/providers/StoreProvider";

export const getProductsData = (state: StateSchema) => state.products;