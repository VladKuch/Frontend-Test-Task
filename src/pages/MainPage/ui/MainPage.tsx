import cls from './MainPage.module.scss';
import { Table } from 'widgets/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { ProductType, fetchProducts, getProductsData } from 'entities/Products';
import { Pagination, getPaginationInfo } from 'entities/Pagination';
import { Filters, getFilters } from 'entities/Filters';

export function MainPage () {
    const header = ['ID', 'Название', 'Бренд', 'Цена'];
    const productsLimit = 50;
    const {currentPage} = useSelector(getPaginationInfo);
    const filters = useSelector(getFilters);
    const dispatch = useDispatch();
    const {result, isLoaded, isFiltered } = useSelector(getProductsData);
    
    const rows = result.map((product: ProductType) => ([
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
        <Filters isLoaded={isLoaded}/>
        { !isFiltered && <Pagination /> }
        <Table 
          header={header}  
          rows={rows}
          isLoaded={isLoaded}
        />
      </main>
    );
};