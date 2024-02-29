import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './ReducerManager';
import { $api } from 'shared/api/api';
import { productsReducer } from 'entities/Products';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
    ) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        products: productsReducer
    }
    
    const reducerManager = createReducerManager(rootReducer);
   

    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware ({
            thunk: {
                extraArgument: {
                    api: $api
                }
            }
        })
    });
    //@ts-ignore
    store.reducerManager = reducerManager;
    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];