import { StateSchema } from "app/providers/StoreProvider";

export const getProducts = (state: StateSchema) => state.products.result;