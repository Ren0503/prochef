import { combineReducers } from 'redux'
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer,
} from './userReducers'

import {
    foodListReducer,
    foodDetailReducer,
    foodCreateReducer,
    foodDeleteReducer,
    foodUpdateReducer,
} from './foodReducers'

import {
    orderListReducer,
    orderDetailReducer,
    orderDeliverReducer
} from './orderReducers'

import { ReduxState } from 'types/ReduxState'

const reducer = combineReducers<ReduxState>({
    userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetail: userDetailReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
    foodList: foodListReducer,
    foodDetail: foodDetailReducer,
    foodCreate: foodCreateReducer,
    foodUpdate: foodUpdateReducer,
    foodDelete: foodDeleteReducer,
    orderList: orderListReducer,
    orderDetail: orderDetailReducer,
    orderDeliver: orderDeliverReducer,
})

export default reducer