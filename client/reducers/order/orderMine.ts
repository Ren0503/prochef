import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import { ReduxState } from 'store'
import { logout, UserLoginState } from 'reducers/user'
import { OrderDetail } from 'interfaces'

export const listMyOrders = createAsyncThunk<OrderDetail[]>(
    'ORDER_LIST_MY',
    async (args, thunkAPI) => {
        const state: ReduxState = thunkAPI.getState()
        const userLogin: UserLoginState = state.userLogin
        const token = userLogin.userInfo?.token

        if (!token) {
            throw new Error('no user login token')
        }

        const response = await fetch(`/api/orders/my_orders`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }

        const order = data as OrderDetail[]
        return order
    }
)

export interface OrderListMyState {
    loading: boolean
    orders: OrderDetail[]
    error?: string
}

const initialOrderListMyState: OrderListMyState = {
    loading: false,
    orders: [],
}

export const orderListMySlice = createSlice({
    name: 'orderListMy',
    initialState: initialOrderListMyState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listMyOrders.pending, (state) => {
            state.loading = true
            state.error = undefined
        })
        builder.addCase(listMyOrders.fulfilled, (state, { payload }) => {
            state.loading = false
            state.orders = payload
        })
        builder.addCase(listMyOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(logout, (state) => {
            state.error = undefined
            state.loading = false
            state.orders = []
        })
    },
})

