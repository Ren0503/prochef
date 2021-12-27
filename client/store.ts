import {
    Action,
    AnyAction,
    combineReducers,
    configureStore,
    EnhancedStore,
    Reducer,
    ThunkAction,
} from '@reduxjs/toolkit'
import { ThunkMiddlewareFor } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { createWrapper } from 'next-redux-wrapper'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PersistConfig,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

import {
    userLoginSlice,
    userRegisterSlice,
    userDetailsSlice,
    userUpdateProfileSlice,
} from 'reducers/user'

import {
    foodListSlice,
    foodDetailSlice,
    foodTopSlice,
    createFoodReviewSlice,
} from 'reducers/food'

import {
    cartSlice
} from 'reducers/cart'

import {
    orderCreateSlice,
    orderDetailsSlice,
    orderListMySlice,
    orderPaySlice,
} from 'reducers/order'

function optionalPersistReducer<S, A extends Action = AnyAction>(
    isServer: boolean,
    reducer: Reducer<S, A>,
    persistConfig: PersistConfig<S>
): Reducer<S, A> | Reducer<S & PersistPartial, A> {
    return isServer ? reducer : persistReducer(persistConfig, reducer)
}

function createReducer(isServer: boolean): Reducer {
    const cartPersistConfig = {
        key: 'cart',
        storage,
        whitelist: ['cartItems', 'shippingAddress', 'paymentMethod'], // place to select which state you want to persist
    }

    const userLoginPersistConfig = {
        key: 'userLogin',
        storage,
        whitelist: ['userInfo'], // place to select which state you want to persist
    }
    
    const rootReducer = combineReducers({
        userLogin: optionalPersistReducer(isServer, userLoginSlice.reducer, userLoginPersistConfig),
        userRegister: userRegisterSlice.reducer,
        userDetail: userDetailsSlice.reducer,
        userUpdateProfile: userUpdateProfileSlice.reducer,
        foodList: foodListSlice.reducer,
        foodDetail: foodDetailSlice.reducer,
        foodTop: foodTopSlice.reducer,
        createFoodReview: createFoodReviewSlice.reducer,
        cart: optionalPersistReducer(isServer, cartSlice.reducer, cartPersistConfig),
        orderCreate: orderCreateSlice.reducer,
        orderDetails: orderDetailsSlice.reducer,
        orderPay: orderPaySlice.reducer,
        orderListMy: orderListMySlice.reducer,
    })
    return rootReducer
}

const dummyServerReducer = createReducer(true)

export type ReduxState = ReturnType<typeof dummyServerReducer>

export type StoreType = EnhancedStore<ReduxState, AnyAction, [ThunkMiddlewareFor<ReduxState>]>

const makeStore = (): StoreType => {
    const isServer = typeof window === 'undefined'
    const store = (configureStore<ReduxState>({
        reducer: createReducer(isServer),
        // @ts-ignore: cant be bothered right now
        middleware: (getDefaultMiddleware) => getDefaultMiddleware<ReduxState>({
            thunk: true,
            immutableCheck: true,
            // @ts-ignore: wrong typescript for this
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
        devTools: true,
        //preloadedState: initialState,
    }) as unknown) as StoreType

    if (!isServer) {
        // @ts-ignore: this will be ok
        store.__persistor = persistStore(store) // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
    }
    return store
}

export const wrapper = createWrapper<ReduxState>(makeStore, { debug: true })

export type AppThunk = ThunkAction<void, ReduxState, unknown, Action<string>>
