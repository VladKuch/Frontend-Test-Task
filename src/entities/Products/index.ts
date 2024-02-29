export {
    ProductType,
    ProductsSchema,
    ProductIdsSchema
} from './model/types/products';

export {
    productsActions,
    productsReducer
} from './model/slice/productsSlice';

export {
    fetchProducts
} from './model/services/fetchProducts/fetchProducts';

export {
    getProducts
} from './model/selectors/getProducs/getProducts';

export {
    getProductsIsLoaded
} from './model/selectors/getProducsIsLoaded/getProductsIsLoaded';

export {
    getProductsError
} from './model/selectors/getProductsError/getProductsError';

export {
    getProductsTotalCount
} from './model/selectors/getProducsTotalCount/getProductsTotalCount';