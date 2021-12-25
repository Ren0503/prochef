import {
	OrderDetailActionTypes,
	OrderDetailAction,
	OrderDetailState,
	OrderListAction,
	OrderListActionTypes,
	OrderListState,
	OrderDeliverState,
	OrderDeliverAction,
	OrderDeliverActionTypes
} from 'types/orders'

const orderDetailReducerInitialState: OrderDetailState = {
	loading: false
}

export const orderDetailReducer = (
	state: OrderDetailState = orderDetailReducerInitialState,
	action: OrderDetailAction
) => {
	switch (action.type) {
		case OrderDetailActionTypes.ORDER_DETAIL_REQUEST:
			return { 
                ...state, 
                loading: true 
            }
		case OrderDetailActionTypes.ORDER_DETAIL_SUCCESS:
			return { 
                loading: false,
                order: action.payload 
            }
		case OrderDetailActionTypes.ORDER_DETAIL_FAILURE:
			return { 
                loading: false, 
                error: action.payload 
            }
		default:
			return state
	}
}

const orderListReducerInitialState: OrderListState = {
	orders: [],
	loading: false
}

export const orderListReducer = (
	state: OrderListState = orderListReducerInitialState,
	action: OrderListAction
) => {
	switch (action.type) {
		case OrderListActionTypes.ORDER_LIST_REQUEST:
			return { 
                loading: true, 
                orders: state.orders 
            }
		case OrderListActionTypes.ORDER_LIST_SUCCESS:
			return { 
                loading: false, 
                orders: action.payload 
            }
		case OrderListActionTypes.ORDER_LIST_FAILURE:
			return { 
                loading: false, 
                error: action.payload, 
                orders: state.orders 
            }
		default:
			return state
	}
}

const orderDeliverReducerInitialState: OrderDeliverState = {
	loading: false
}

export const orderDeliverReducer = (
	state: OrderDeliverState = orderDeliverReducerInitialState,
	action: OrderDeliverAction
) => {
	switch (action.type) {
		case OrderDeliverActionTypes.ORDER_DELIVER_REQUEST:
			return { 
                ...state, 
                loading: true 
            }
		case OrderDeliverActionTypes.ORDER_DELIVER_SUCCESS:
			return { 
                loading: false, 
                success: true 
            }
		case OrderDeliverActionTypes.ORDER_DELIVER_FAILURE:
			return { 
                loading: false, 
                error: action.payload 
            }
		case OrderDeliverActionTypes.ORDER_DELIVER_RESET:
			return {}
		default:
			return state
	}
}
