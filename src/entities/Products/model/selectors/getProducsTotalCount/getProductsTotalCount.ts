import { StateSchema } from "app/providers/StoreProvider";

export const getProductsTotalCount = (state: StateSchema) => state.products.totalCount;