import { Order } from './Order'

export interface PaymentResult {
	id: string
	status: string
	update_time: string
	email_address: string
}

export interface OrderDetail extends Order {
	_id: string
	user: {
		_id: string
		name: string
		email: string
	}
	isPaid: boolean
	isDelivered: boolean
	paidAt?: string
	deliveredAt?: string
	paymentResult?: PaymentResult
}

export interface OrderDetailState {
	loading: boolean
	order?: OrderDetail
	error?: any
}

export enum OrderDetailActionTypes {
	ORDER_DETAIL_REQUEST = 'ORDER_DETAIL_REQUEST',
	ORDER_DETAIL_SUCCESS = 'ORDER_DETAIL_SUCCESS',
	ORDER_DETAIL_FAILURE = 'ORDER_DETAIL_FAILURE'
}

export interface OrderDetailRequestAction {
	type: OrderDetailActionTypes.ORDER_DETAIL_REQUEST
}

export interface OrderDetailSuccessAction {
	type: OrderDetailActionTypes.ORDER_DETAIL_SUCCESS
	payload: OrderDetail
}

export interface OrderDetailFailureAction {
	type: OrderDetailActionTypes.ORDER_DETAIL_FAILURE
	payload: any
}

export type OrderDetailAction =
	| OrderDetailRequestAction
	| OrderDetailSuccessAction
	| OrderDetailFailureAction
