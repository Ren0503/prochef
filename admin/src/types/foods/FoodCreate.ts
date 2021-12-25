import { Food } from './Food'

export interface FoodCreateState {
	success?: boolean
	food?: Food
	loading?: boolean
	error?: any
}

export enum FoodCreateActionTypes {
	FOOD_CREATE_REQUEST = 'FOOD_CREATE_REQUEST',
	FOOD_CREATE_SUCCESS = 'FOOD_CREATE_SUCCESS',
	FOOD_CREATE_FAILURE = 'FOOD_CREATE_FAILURE',
	FOOD_CREATE_RESET = 'FOOD_CREATE_RESET'
}

export interface FoodCreateRequestAction {
	type: FoodCreateActionTypes.FOOD_CREATE_REQUEST
}

export interface FoodCreateSuccessAction {
	type: FoodCreateActionTypes.FOOD_CREATE_SUCCESS
	payload: Food
}

export interface FoodCreateFailureAction {
	type: FoodCreateActionTypes.FOOD_CREATE_FAILURE
	payload: any
}

export interface FoodCreateResetAction {
	type: FoodCreateActionTypes.FOOD_CREATE_RESET
}

export type FoodCreateAction =
	| FoodCreateRequestAction
	| FoodCreateSuccessAction
	| FoodCreateFailureAction
	| FoodCreateResetAction
