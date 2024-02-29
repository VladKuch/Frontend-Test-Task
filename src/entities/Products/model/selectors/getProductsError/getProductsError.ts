import { StateSchema } from "app/providers/StoreProvider";

export const getProductsError = (state: StateSchema) => state.products.error;