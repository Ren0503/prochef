import { Food } from './Food'

export interface FoodDetailState {
	loading: boolean
	food?: Food
	error?: undefined
}

export enum FoodDetailActionTypes {
	FOOD_DETAIL_REQUEST = 'FOOD_DETAIL_REQUEST',
	FOOD_DETAIL_SUCCESS = 'FOOD_DETAIL_SUCCESS',
	FOOD_DETAIL_FAILURE = 'FOOD_DETAIL_FAILURE'
}

export interface FetchFoodRequestAction {
	type: FoodDetailActionTypes.FOOD_DETAIL_REQUEST
}

export interface FetchFoodSuccessAction {
	type: FoodDetailActionTypes.FOOD_DETAIL_SUCCESS
	payload: Food
}

export interface FetchFoodFailureAction {
	type: FoodDetailActionTypes.FOOD_DETAIL_FAILURE
	payload: any
}

export type FoodDetailAction =
	| FetchFoodRequestAction
	| FetchFoodSuccessAction
	| FetchFoodFailureAction
