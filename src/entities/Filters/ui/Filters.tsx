import { InputNumber } from 'shared/ui/Inputs/InputNumber';
import cls from './Filters.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { memo, useCallback, useState } from 'react';
import { InputText } from 'shared/ui/Inputs/InputText';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { filtersActions } from '../model/slice/filtersSlice';
import { useSelector } from 'react-redux';
import { getFilters } from '../model/selectors/getFilters/getFilters';
import { FiltersSchema } from '../model/types/filters';

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
    
    const onPriceChange = useCallback(
        (value) => {
            setFilterPrice(value);
        }, 
        [setFilterPrice]
    );
    const onProductChange = useCallback(
        (value) => {
            setFilterProduct(value);
        }, 
        [setFilterProduct]
    );
    const onBrandChange = useCallback(
        (value) => {
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
            <InputText id='product' label='Название:' onChange={onProductChange} value={filterProduct}/>
            <InputText id='brand' label='Бренд:' onChange={onBrandChange} value={filterBrand}/>
            <InputNumber id='price' label='Цена:' onChange={onPriceChange} value={filterPrice} />
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