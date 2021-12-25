import {
    FoodListAction,
    FoodListActionTypes,
    FoodListState,
    FoodDetailAction,
    FoodDetailActionTypes,
    FoodDetailState,
    FoodCreateAction,
    FoodCreateActionTypes,
    FoodCreateState,
    FoodUpdateAction,
    FoodUpdateActionTypes,
    FoodUpdateState,
    FoodDeleteAction,
    FoodDeleteActionTypes,
    FoodDeleteState,
} from 'types/foods'

const initialFoodListState: FoodListState = {
    foods: [],
    loading: false,
}

export const foodListReducer = (
    state: FoodListState = initialFoodListState,
    action: FoodListAction
) => {
    switch (action.type) {
        case FoodListActionTypes.FOOD_LIST_REQUEST:
            return {
                loading: true,
                foods: initialFoodListState.foods
            }
        case FoodListActionTypes.FOOD_LIST_SUCCESS:
            return {
                loading: initialFoodListState.loading,
                foods: action.payload.foods,
                pages: action.payload.pages,
				page: action.payload.page
            }
        case FoodListActionTypes.FOOD_LIST_FAILURE:
            return {
                loading: initialFoodListState.loading,
                foods: initialFoodListState.foods,
                error: action.payload
            }
        default:
            return state
    }
}

const initialFoodDetailState: FoodDetailState = {
    loading: false
}

export const foodDetailReducer = (
    state: FoodDetailState = initialFoodDetailState,
    action: FoodDetailAction
) => {
    switch (action.type) {
        case FoodDetailActionTypes.FOOD_DETAIL_REQUEST:
            return {
                loading: true,
                food: initialFoodDetailState.food
            }
        case FoodDetailActionTypes.FOOD_DETAIL_SUCCESS:
            return {
                loading: initialFoodDetailState.loading,
                food: action.payload
            }
        case FoodDetailActionTypes.FOOD_DETAIL_FAILURE:
            return {
                loading: initialFoodDetailState.loading,
                food: initialFoodDetailState.food,
                error: action.payload
            }
        default:
            return state
    }
}

const initialFoodDeleteState: FoodDeleteState = {
	loading: false
}

export const foodDeleteReducer = (
	state: FoodDeleteState = initialFoodDeleteState,
	action: FoodDeleteAction
) => {
	switch (action.type) {
		case FoodDeleteActionTypes.FOOD_DELETE_REQUEST:
			return { loading: true }
		case FoodDeleteActionTypes.FOOD_DELETE_SUCCESS:
			return {
				loading: initialFoodDeleteState.loading,
				success: true
			}
		case FoodDeleteActionTypes.FOOD_DELETE_FAILURE:
			return {
				error: action.payload
			}
		default:
			return state
	}
}

const initialFoodCreateState: FoodCreateState = {
	loading: false
}

export const foodCreateReducer = (
	state: FoodCreateState = initialFoodCreateState,
	action: FoodCreateAction
) => {
	switch (action.type) {
		case FoodCreateActionTypes.FOOD_CREATE_REQUEST:
			return { loading: true }
		case FoodCreateActionTypes.FOOD_CREATE_SUCCESS:
			return {
				loading: initialFoodCreateState.loading,
				success: true,
				food: action.payload
			}
		case FoodCreateActionTypes.FOOD_CREATE_FAILURE:
			return {
				error: action.payload
			}
		case FoodCreateActionTypes.FOOD_CREATE_RESET:
			return {}
		default:
			return state
	}
}

const initialFoodUpdateState: FoodUpdateState = {
	loading: false
}

export const foodUpdateReducer = (
	state: FoodUpdateState = initialFoodUpdateState,
	action: FoodUpdateAction
) => {
	switch (action.type) {
		case FoodUpdateActionTypes.FOOD_UPDATE_REQUEST:
			return { loading: true }
		case FoodUpdateActionTypes.FOOD_UPDATE_SUCCESS:
			return {
				loading: initialFoodUpdateState.loading,
				success: true,
				food: action.payload
			}
		case FoodUpdateActionTypes.FOOD_UPDATE_FAILURE:
			return {
				error: action.payload
			}
		case FoodUpdateActionTypes.FOOD_UPDATE_RESET:
			return {}
		default:
			return state
	}
}