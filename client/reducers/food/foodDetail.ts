import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { FoodDetail } from 'interfaces'
import { baseUrl } from 'utils'

export const detailFood = createAsyncThunk<FoodDetail, string>(
    'FOOD_DETAIL',
    async (foodId) => {
        const response = await fetch(`${baseUrl}/api/foods/${foodId}/`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data?.message ?? response.statusText)
        }
        return data as FoodDetail
    }
)

export type FoodDetailState = {
    loading: boolean
    food?: FoodDetail
    error?: string
}

const initialFoodDetailState: FoodDetailState = {
    loading: false,
}

export const foodDetailSlice = createSlice({
    name: 'foodDetail',
    initialState: initialFoodDetailState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(detailFood.pending, (state) => {
            state.loading = true
        })
        builder.addCase(detailFood.fulfilled, (state, { payload }) => {
            state.loading = false
            state.food = payload
        })
        builder.addCase(detailFood.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})