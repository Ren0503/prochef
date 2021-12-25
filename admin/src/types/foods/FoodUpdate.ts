import { Food } from './Food'

export interface FoodUpdateState {
	success?: boolean
	food?: Food
	loading?: boolean
	error?: any
}

export enum FoodUpdateActionTypes {
	FOOD_UPDATE_REQUEST = 'FOOD_UPDATE_REQUEST',
	FOOD_UPDATE_SUCCESS = 'FOOD_UPDATE_SUCCESS',
	FOOD_UPDATE_FAILURE = 'FOOD_UPDATE_FAILURE',
	FOOD_UPDATE_RESET = 'FOOD_UPDATE_RESET'
}

export interface FoodUpdateRequestAction {
	type: FoodUpdateActionTypes.FOOD_UPDATE_REQUEST
}

export interface FoodUpdateSuccessAction {
	type: FoodUpdateActionTypes.FOOD_UPDATE_SUCCESS
	payload: Food
}

export interface FoodUpdateFailureAction {
	type: FoodUpdateActionTypes.FOOD_UPDATE_FAILURE
	payload: any
}

export interface FoodUpdateResetAction {
	type: FoodUpdateActionTypes.FOOD_UPDATE_RESET
}

export type FoodUpdateAction =
	| FoodUpdateRequestAction
	| FoodUpdateSuccessAction
	| FoodUpdateFailureAction
	| FoodUpdateResetAction
