import { Food } from './Food'

export interface FoodListState {
	foods: Food[]
	pages?: number
	page?: number
	loading: boolean
	error?: undefined
}

export enum FoodListActionTypes {
	FOOD_LIST_REQUEST = 'FOOD_LIST_REQUEST',
	FOOD_LIST_SUCCESS = 'FOOD_LIST_SUCCESS',
	FOOD_LIST_FAILURE = 'FOOD_LIST_FAILURE'
}

export interface FetchFoodsRequestAction {
	type: FoodListActionTypes.FOOD_LIST_REQUEST
}

export interface FetchFoodsSuccessAction {
	type: FoodListActionTypes.FOOD_LIST_SUCCESS
	payload: { 
		foods: Food[]
		pages: number
		page: number 
	}
}

export interface FetchFoodsFailureAction {
	type: FoodListActionTypes.FOOD_LIST_FAILURE
	payload: any
}

export type FoodListAction =
	| FetchFoodsSuccessAction
	| FetchFoodsFailureAction
	| FetchFoodsRequestAction
