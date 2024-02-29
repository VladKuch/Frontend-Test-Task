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
    getProductsData
} from './model/selectors/getProductsData/getProductsData';