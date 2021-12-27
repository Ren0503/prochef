import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import { ReduxState } from 'store'
import { UserLoginState } from 'reducers/user'
import { OrderDetail } from 'interfaces'

export const getOrderDetails = createAsyncThunk<OrderDetail, string>(
    'ORDER_DETAIL',
    async (orderId: string, thunkAPI) => {
        const state: ReduxState = thunkAPI.getState()
        const userLogin: UserLoginState = state.userLogin
        const token = userLogin.userInfo?.token

        if (!token) {
            throw new Error('no user login token')
        }

        const response = await fetch(`/api/orders/${orderId}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }

        const order = data as OrderDetail
        return order
    }
)



export interface OrderDetailsState {
    loading: boolean
    order?: OrderDetail
    error?: string
}

const initialOrderDetailsState: OrderDetailsState = {
    loading: false,
    order: undefined,
}

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: initialOrderDetailsState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrderDetails.pending, (state) => {
            state.loading = true
            state.error = undefined
        })
        builder.addCase(getOrderDetails.fulfilled, (state, { payload }) => {
            state.loading = false
            state.order = payload
        })
        builder.addCase(getOrderDetails.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})