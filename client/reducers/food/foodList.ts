import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { Food, FoodList } from 'interfaces'
import { baseUrl } from 'utils'

export const listFoods = createAsyncThunk<
    FoodList,
    { keyword: string, pageNumber?: number }
>('FOOD_LIST', async (args) => {
    const { keyword } = args
    const pageNumber = args.pageNumber ?? 1
    const response = await fetch(
        `${baseUrl}/api/foods?keyword=${keyword ?? ''}&page=${pageNumber}`
    )
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data?.message ?? response.statusText)
    }
    return data as FoodList
})

export type FoodListState = {
    loading: boolean
    foods: Food[]
    error?: string
    page: number
    pages: number
}

const initialFoodListState: FoodListState = {
    loading: false,
    foods: [],
    page: 1,
    pages: 1,
}

export const foodListSlice = createSlice({
    name: 'foodList',
    initialState: initialFoodListState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listFoods.pending, (state) => {
            state.loading = true
            state.foods = []
            state.page = 1
            state.pages = 1
        })
        builder.addCase(listFoods.fulfilled, (state, { payload }) => {
            state.loading = false
            state.foods = payload.foods
            state.pages = payload.pages
            state.page = payload.page
        })
        builder.addCase(listFoods.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})