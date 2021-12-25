import axios from 'axios'
import { errorHandler } from 'error'

import { AppThunk } from 'store'
import {
    OrderListActionTypes,
    OrderList,
    OrderDetail,
    OrderDetailActionTypes,
    OrderDeliverActionTypes,
} from 'types/orders'

export const listOrders = (): AppThunk => async (dispatch, getState) => {
	try {
		dispatch({ type: OrderListActionTypes.ORDER_LIST_REQUEST })

		const { userInfo } = getState().userLogin

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo?.token}`
			}
		}

		const { data } = await axios.get<OrderList[]>(`/api/orders/`, config)
		
        dispatch({
			type: OrderListActionTypes.ORDER_LIST_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: OrderListActionTypes.ORDER_LIST_FAILURE,
			payload: errorHandler(error)
		})
	}
}

export const getOrderDetail = (id: string): AppThunk => async (
    dispatch,
    getState
) => {
    try {
        dispatch({ type: OrderDetailActionTypes.ORDER_DETAIL_REQUEST })

        const { userInfo } = getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Bearer ${userInfo?.token}`
            }
        }

        const { data } = await axios.get<OrderDetail>(`/api/orders/${id}/`, config)

        dispatch({
            type: OrderDetailActionTypes.ORDER_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: OrderDetailActionTypes.ORDER_DETAIL_FAILURE,
            payload: errorHandler(error)
        })
    }
}

export const deliverOrder = (orderId: string): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: OrderDeliverActionTypes.ORDER_DELIVER_REQUEST })
		
        const { userInfo } = getState().userLogin
		
        const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo?.token}`
			}
		}

		await axios.put(`/api/orders/${orderId}/deliver/`, {}, config)
		
        dispatch({
			type: OrderDeliverActionTypes.ORDER_DELIVER_SUCCESS
		})
	} catch (error) {
		dispatch({
			type: OrderDeliverActionTypes.ORDER_DELIVER_FAILURE,
			payload: errorHandler(error)
		})
	}
}