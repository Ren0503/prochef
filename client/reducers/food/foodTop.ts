import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { Food } from 'interfaces'
import { baseUrl } from 'utils'

export const listTopFoods = createAsyncThunk<Food[], void>('FOOD_TOP', async () => {
    const response = await fetch(`${baseUrl}/api/foods/top/`)
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data?.message ?? response.statusText)
    }
    return data as Food[]
})

export type FoodTopRatedState = {
    loading: boolean
    foods: Food[]
    error?: string
}

const initialFoodTopRatedState: FoodTopRatedState = {
    loading: false,
    foods: [],
}

export const foodTopSlice = createSlice({
    name: 'foodTop',
    initialState: initialFoodTopRatedState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listTopFoods.pending, (state) => {
            state.loading = true
            state.foods = []
            state.error = undefined
        })
        builder.addCase(listTopFoods.fulfilled, (state, { payload }) => {
            state.loading = false
            state.foods = payload
        })
        builder.addCase(listTopFoods.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})