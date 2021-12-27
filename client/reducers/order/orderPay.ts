import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import { ReduxState } from 'store'
import { UserLoginState } from 'reducers/user'
import { OrderDetail, PayData } from 'interfaces'

export const payOrder = createAsyncThunk<OrderDetail, PayData>(
    'ORDER_PAY',
    async (args: PayData, thunkAPI) => {
        const state: ReduxState = thunkAPI.getState()
        const userLogin: UserLoginState = state.userLogin
        const token = userLogin.userInfo?.token

        if (!token) {
            throw new Error('no user login token')
        }

        const { orderId, paymentResult } = args
        const response = await fetch(`/api/orders/${orderId}/pay`, {
            method: 'PUT',
            body: JSON.stringify(paymentResult),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }

        const updatedOrder = data as OrderDetail
        return updatedOrder
    }
)

export interface OrderPayState {
    loading: boolean
    order?: OrderDetail
    error?: string
    success?: boolean
}

const initialOrderPayState: OrderPayState = {
    loading: false,
    order: undefined,
}

export const orderPaySlice = createSlice({
    name: 'orderPay',
    initialState: initialOrderPayState,
    reducers: {
        reset: (state) => {
            state.error = undefined
            state.loading = false
            state.order = undefined
            state.success = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(payOrder.pending, (state) => {
            state.loading = true
            state.error = undefined
        })
        builder.addCase(payOrder.fulfilled, (state, { payload }) => {
            state.loading = false
            state.order = payload
            state.success = true
        })
        builder.addCase(payOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})
