import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit'

import { CreateReviewInput } from 'interfaces'
import { baseUrl } from 'utils'

import { ReduxState } from 'store'
import { UserLoginState } from 'reducers/user'

export const createFoodReview = createAsyncThunk<
    void,
    CreateReviewInput & { foodId: string }
>(
    'FOOD_CREATE_REVIEW',
    async (payload: CreateReviewInput & { foodId: string }, thunkAPI) => {
        const state: ReduxState = thunkAPI.getState()
        const userLogin: UserLoginState = state.userLogin
        const token = userLogin.userInfo?.token
        const { foodId } = payload

        if (!token) {
            throw new Error('no user login token')
        }
        const response = await fetch(`${baseUrl}/api/foods/${foodId}/reviews/`, {
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
    }
)

export interface FoodCreateReviewState {
    loading: boolean
    success?: boolean
    error?: string
}

const initialFoodCreateReviewState: FoodCreateReviewState = { loading: false }


export const createFoodReviewSlice = createSlice({
    name: 'foodCreateReview',
    initialState: initialFoodCreateReviewState,
    reducers: {
        reset: (state) => {
            state.error = undefined
            state.loading = false
            state.success = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createFoodReview.pending, (state) => {
            state.loading = true
            state.error = undefined
        })
        builder.addCase(createFoodReview.fulfilled, (state) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(createFoodReview.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    },
})