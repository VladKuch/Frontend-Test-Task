import cls from './MainPage.module.scss';
import { FilterSection } from 'widgets/FilterSection';
import { Table } from 'widgets/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { ProductType, fetchProducts, getProducts, getProductsIsLoaded, getProductsTotalCount } from 'entities/Products';
import { Loader } from 'widgets/Loader';
import { FiltersType } from 'widgets/FilterSection/ui/FilterSection';

export function MainPage () {
    const header = ['ID', 'Название', 'Бренд', 'Цена'];
    const productsLimit = 50;
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [filters, setFilters] = useState<FiltersType>({});
    const dispatch = useDispatch();
    const products = useSelector(getProducts);
    const isLoaded = useSelector(getProductsIsLoaded);
    const totalCount = useSelector(getProductsTotalCount);

    const onFiltersSubmit = useCallback(
        (filters) => {
            setFilters(filters);
        }, 
        [setFilters]
    );
    
    const rows = products.map((product: ProductType) => ([
        product.id,
        product.product,
        product.brand,
        product.price.toString()
    ]));

    useEffect(() => {
        async function fetchData() {
            const paginationParams = {
              offset: currentPage,
              limit: productsLimit
            }
            await dispatch(fetchProducts(Object.keys(filters).length > 0 ? filters: paginationParams));
        }
        fetchData();
    }, [currentPage, filters, dispatch]);

    return (
      <main className={cls.MainPage}>
        <h2>Список товаров</h2>
        <FilterSection onSubmit={onFiltersSubmit}/>
        {
          isLoaded ? 
          <Table 
            header={header}  
            rows={rows}
          />
          :
          <Loader />
        }
      </main>
    );
};