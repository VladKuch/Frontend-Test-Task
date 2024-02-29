export { 
    Pagination 
} from './ui/Pagination';

export { 
    PaginationSchema 
} from './model/types/pagination';

export { 
    paginationActions,
    paginationReducer
} from './model/slice/paginationSlice';

export {
    getPaginationInfo
} from './model/selectors/getPaginationInfo/getPaginationInfo';