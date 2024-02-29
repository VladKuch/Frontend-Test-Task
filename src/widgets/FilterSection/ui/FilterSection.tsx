import { InputNumber } from 'shared/ui/Inputs/InputNumber';
import cls from './FilterSection.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { memo, useCallback, useState } from 'react';
import { InputText } from 'shared/ui/Inputs/InputText';

export type FiltersType = {
    price?: number;
    product?: string;
    brand?: string;
}
interface FilterSectionProps {
    onSubmit: (filters: FiltersType) => void
}
export const FilterSection = memo((props: FilterSectionProps) => {
    const { 
        onSubmit
    } = props
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
            const filters: FiltersType = {};
            if (filterBrand !== '') {
                filters.brand = filterBrand
            }
            if (filterProduct !== '') {
                filters.product = filterProduct
            }
            if (filterPrice !== 0) {
                filters.price = filterPrice
            }
            onSubmit(filters);
        },
        [filterBrand, filterPrice, filterProduct]
    )
    const onClearFilters = useCallback(
        () => {
            setFilterBrand('');
            setFilterProduct('');
            setFilterPrice(0);
            const filters: FiltersType = {};
            onSubmit(filters);
        },
        [setFilterBrand, setFilterPrice, setFilterProduct]
    )
    return (
        <div className={cls.FilterSection}>
            <InputText id='product' label='Название:' onChange={onProductChange} value={filterProduct}/>
            <InputText id='brand' label='Бренд:' onChange={onBrandChange} value={filterBrand}/>
            <InputNumber id='price' label='Цена:' onChange={onPriceChange} value={filterPrice} />
            <Button onClick={onFiltersSubmit} theme={ButtonTheme.SUCCESS} className={cls.submitFilter}>Применить фильтры</Button>
            <Button onClick={onClearFilters}>Сбросить фильтры</Button>
        </div>
    );
});