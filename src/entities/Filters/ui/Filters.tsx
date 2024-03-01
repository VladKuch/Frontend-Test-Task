import { InputNumber } from 'shared/ui/Inputs/InputNumber';
import cls from './Filters.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { memo, useCallback, useEffect, useState } from 'react';
import { InputText } from 'shared/ui/Inputs/InputText';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { filtersActions } from '../model/slice/filtersSlice';
import { FiltersSchema } from '../model/types/filters';
import { Select } from 'shared/ui/Inputs/Select';
import { BrandsSchema, fetchBrands, getBrands } from 'entities/Brands';
import { useSelector } from 'react-redux';

interface FiltersProps {
    isLoaded: boolean
}

export const Filters = memo((props: FiltersProps) => {
    const { 
        isLoaded
    } = props
    const dispatch = useAppDispatch();
    const [filterPrice, setFilterPrice] = useState<number>(0);
    const [filterProduct, setFilterProduct] = useState<string>('');
    const [filterBrand, setFilterBrand] = useState<string>('');
    const brands: BrandsSchema = useSelector(getBrands);

    useEffect(() => {
        async function fetchData() {
            await dispatch(fetchBrands());
        }
        console.log('Поиск брендов')
        fetchData();
    }, [])

    const onPriceChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterPrice(parseFloat(e.target.value));
        }, 
        [setFilterPrice]
    );

    const onProductChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterProduct(e.target.value);
        }, 
        [setFilterProduct]
    );

    const onBrandChange = useCallback(
        (value: string) => {
            setFilterBrand(value);
        }, 
        [setFilterBrand]
    );

    const onFiltersSubmit = useCallback(
        () => {
            const filters: FiltersSchema = {};
            if (filterPrice > 0) {
                filters.price = filterPrice;
            }

            if (filterBrand !== '') {
                filters.brand = filterBrand;
            }

            if (filterProduct !== '') {
                filters.product = filterProduct;
            }
            dispatch(filtersActions.setFilters(filters))
        },
        [dispatch, filterPrice, filterBrand, filterProduct]
    )

    const onClearFilters = useCallback(
        () => {
            setFilterBrand('');
            setFilterPrice(0);
            setFilterProduct('');
            dispatch(filtersActions.resetFilters());
        }, [dispatch, setFilterBrand, setFilterPrice, setFilterProduct]
    )

    return (
        <div className={cls.FilterSection}>
            <InputText 
                id='product' 
                label='Название:' 
                onChange={onProductChange} 
                value={filterProduct}
            />
            <Select
                id='brand' 
                label='Бренд:' 
                onChange={onBrandChange} 
                value={filterBrand}
                options={brands}
            />
            <InputNumber 
                id='price' 
                label='Цена:' 
                onChange={onPriceChange} 
                value={filterPrice} 
                max={1}
            />
            <Button 
                onClick={onFiltersSubmit} 
                theme={ButtonTheme.SUCCESS} 
                className={cls.submitFilter}
                disabled={!isLoaded}
            >Применить фильтры</Button>
            <Button 
                onClick={onClearFilters}
                disabled={!isLoaded}
            >Сбросить фильтры</Button>
        </div>
    );
});