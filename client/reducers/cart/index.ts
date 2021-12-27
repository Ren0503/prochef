import {
    createAsyncThunk,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit'

import { ReduxState } from 'store'
import { ShippingAddress, Cart, Food } from 'interfaces'

export interface CartState {
    cartItems: Cart[]
    shippingAddress?: ShippingAddress
    paymentMethod?: string
}

const initialCartState: CartState = {
    cartItems: [],
    paymentMethod: 'PayPal',
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItem: (state: CartState, action: PayloadAction<Cart>) => {
            const item = action.payload
            const existingItem = state.cartItems.find((it) => it.food === item.food)
            if (existingItem) {
                // replace the previous cart item with new one
                state.cartItems = state.cartItems.map((x) => (x.food === item.food ? item : x))
            } else {
                state.cartItems.push(item)
            }
        },
        removeItem: (state: CartState, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((item) => item.food !== action.payload)
        },
        saveShippingAddress: (state: CartState, action: PayloadAction<ShippingAddress>) => {
            state.shippingAddress = action.payload
        },
        savePaymentMethod: (state: CartState, action: PayloadAction<string>) => {
            state.paymentMethod = action.payload
        },
        reset: (state: CartState) => {
            state.cartItems = []
        },
    },
})

// action thunks

export const addToCart = createAsyncThunk(
    'ADD_TO_CART',
    async (payload: { foodId: string; quantity: number }, thunkAPI) => {
        const { foodId, quantity } = payload
        const response = await fetch(`/api/foods/${foodId}`)
        const data = await response.json()
        
        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }
        const food = data as Food

        const { dispatch, getState } = thunkAPI
        dispatch(
            cartSlice.actions.addItem({
                food: food._id,
                name: food.name,
                countInStock: food.countInStock,
                image: food.image,
                price: food.price,
                quantity,
            })
        )

        // also save the store state to local storage
        const storeState = getState() as ReduxState
        const stateToStore = storeState.cart.cartItems
        localStorage.setItem('cartItems', JSON.stringify(stateToStore))

        return data
    }
)
