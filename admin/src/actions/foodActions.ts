import axios from 'axios'
import { errorHandler } from 'error'

import { AppThunk } from 'store'
import {
    FoodListActionTypes,
    FoodDetailActionTypes,
    Food,
    FoodCreateActionTypes,
    FoodUpdateActionTypes,
    FoodDeleteActionTypes,
} from 'types/foods'

interface UpdateFoodInput {
	_id: string
	name: string
	image: string
	description: string
	category: string
	price: number
	countInStock: number
}

export const listFoods = (
	keyword: string = '',
	pageNumber: string = ''
): AppThunk => async (dispatch) => {
	try {
		dispatch({ type: FoodListActionTypes.FOOD_LIST_REQUEST })

		const { data } = await axios.get<{
			foods: Food[]
			page: number
			pages: number
		}>(`/api/foods?keyword=${keyword}&page=${pageNumber}`)
		
		dispatch({
			type: FoodListActionTypes.FOOD_LIST_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: FoodListActionTypes.FOOD_LIST_FAILURE,
			payload: errorHandler(error)
		})
	}
}

export const detailFood = (id: string): AppThunk => async (
	dispatch
) => {
	try {
		dispatch({ type: FoodDetailActionTypes.FOOD_DETAIL_REQUEST })
		
		const { data } = await axios.get<Food>(`/api/foods/${id}`)

		dispatch({
			type: FoodDetailActionTypes.FOOD_DETAIL_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: FoodDetailActionTypes.FOOD_DETAIL_FAILURE,
			payload: errorHandler(error)
		})
	}
}

export const deleteFood = (id: string): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: FoodDeleteActionTypes.FOOD_DELETE_REQUEST })

		const { userInfo } = getState().userLogin

		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		}

		await axios.delete(`/api/foods/delete/${id}/`, config)

		dispatch({
			type: FoodDeleteActionTypes.FOOD_DELETE_SUCCESS
		})
	} catch (error) {
		dispatch({
			type: FoodDeleteActionTypes.FOOD_DELETE_FAILURE,
			payload: errorHandler(error)
		})
	}
}

export const createFood = (): AppThunk => async (dispatch, getState) => {
	try {
		dispatch({ type: FoodCreateActionTypes.FOOD_CREATE_REQUEST })

		const { userInfo } = getState().userLogin

		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		}
		const { data } = await axios.post<Food>(`/api/foods/create/`, {}, config)

		dispatch({
			type: FoodCreateActionTypes.FOOD_CREATE_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: FoodCreateActionTypes.FOOD_CREATE_FAILURE,
			payload: errorHandler(error)
		})
	}
}

export const updateFood = (food: UpdateFoodInput): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: FoodUpdateActionTypes.FOOD_UPDATE_REQUEST })

		const { userInfo } = getState().userLogin

		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		}

		const { data } = await axios.put<Food>(
			`/api/foods/update/${food._id}/`,
			food,
			config
		)

		dispatch({
			type: FoodUpdateActionTypes.FOOD_UPDATE_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: FoodUpdateActionTypes.FOOD_UPDATE_FAILURE,
			payload: errorHandler(error)
		})
	}
}