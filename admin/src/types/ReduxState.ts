import {
    UserLoginState,
	UserRegisterState,
	UserDetailState,
	UserListState,
	UserUpdateProfileState,
    UserUpdateState,
	UserDeleteState,
} from './users'

import {
    FoodListState,
    FoodDetailState,
    FoodCreateState,
    FoodUpdateState,
    FoodDeleteState,
} from './foods'

import {
    OrderListState,
    OrderDetailState,
    OrderDeliverState,
} from './orders'

export interface ReduxState {
    userLogin: UserLoginState
	userRegister: UserRegisterState
	userDetail: UserDetailState
	userUpdateProfile: UserUpdateProfileState
	userList: UserListState
	userDelete: UserDeleteState
	userUpdate: UserUpdateState
    foodList: FoodListState
    foodDetail: FoodDetailState
    foodCreate: FoodCreateState
    foodUpdate: FoodUpdateState
    foodDelete: FoodDeleteState
    orderList: OrderListState
    orderDetail: OrderDetailState
    orderDeliver: OrderDeliverState
}