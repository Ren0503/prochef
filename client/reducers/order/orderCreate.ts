import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import { ReduxState } from 'store'
import { UserLoginState } from 'reducers/user'
import { OrderInput, OrderDetail } from 'interfaces'

export const createOrder = createAsyncThunk<OrderDetail, OrderInput>(
    'ORDER_CREATE',
    async (payload: OrderInput, thunkAPI) => {
        const state: ReduxState = thunkAPI.getState()
        const userLogin: UserLoginState = state.userLogin
        const token = userLogin.userInfo?.token

        if (!token) {
            throw new Error('no user login token')
        }

        const response = await fetch(`/api/orders`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
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

export interface OrderCreateState {
    loading: boolean
    success?: boolean
    order?: OrderDetail
    error?: string
}

const initialOrderCreateState: OrderCreateState = { loading: false }

export const orderCreateSlice = createSlice({
    name: 'orderCreate',
    initialState: initialOrderCreateState,
    reducers: {
        reset: (state) => {
            state.error = undefined
            state.loading = false
            state.order = undefined
            state.success = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true
            state.error = undefined
        })
        builder.addCase(createOrder.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.order = payload
        })
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})