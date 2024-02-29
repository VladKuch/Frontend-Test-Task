import { useDispatch, useSelector } from 'react-redux';
import cls from './Pagination.module.scss';
import { getPaginationInfo } from '../model/selectors/getPaginationInfo/getPaginationInfo';
import { PaginationSchema } from '../model/types/pagination';
import { paginationActions } from 'entities/Pagination';
import { useCallback } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
interface PaginationProps {
}
export const Pagination = () => {
    const { 
        currentPage,
        isFirstPage,
        isLastPage
    } = useSelector(getPaginationInfo);
    const dispatch = useDispatch();
    const onPrevPage = useCallback(() => {
        dispatch(paginationActions.setPrevPage());
    }, [dispatch]);
    const onNextPage = useCallback(() => {
        dispatch(paginationActions.setNextPage());
    }, [dispatch]);
    return (
        <div className={cls.Pagination}>
            <Button
                disabled={isFirstPage}
                onClick={onPrevPage}
                theme={ButtonTheme.PRIMARY}
            >Назад</Button>
            <span className={cls.currentPage}>{currentPage}</span>
            <Button 
                disabled={isLastPage}
                onClick={onNextPage}
                theme={ButtonTheme.PRIMARY}
            >Вперед</Button>
        </div>
    );
};