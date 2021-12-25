export interface FoodDeleteState {
	success?: boolean
	loading?: boolean
	error?: any
}

export enum FoodDeleteActionTypes {
	FOOD_DELETE_REQUEST = 'FOOD_DELETE_REQUEST',
	FOOD_DELETE_SUCCESS = 'FOOD_DELETE_SUCCESS',
	FOOD_DELETE_FAILURE = 'FOOD_DELETE_FAILURE'
}

export interface FoodDeleteRequestAction {
	type: FoodDeleteActionTypes.FOOD_DELETE_REQUEST
}

export interface FoodDeleteSuccessAction {
	type: FoodDeleteActionTypes.FOOD_DELETE_SUCCESS
}

export interface FoodDeleteFailureAction {
	type: FoodDeleteActionTypes.FOOD_DELETE_FAILURE
	payload: any
}

export type FoodDeleteAction =
	| FoodDeleteRequestAction
	| FoodDeleteSuccessAction
	| FoodDeleteFailureAction
