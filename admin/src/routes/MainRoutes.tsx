import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { FoodEditScreen, FoodListScreen } from 'screens/foods'
import { OrderDetailScreen, OrderListScreen } from 'screens/orders'
import { UserEditScreen, UserListScreen } from 'screens/users'
import { ProfileScreen } from 'screens/settings'

const MainRoutes = () => {
    return (
        <Switch>
            <Route path="/foods" component={FoodListScreen} exact/>
            <Route path="/foods/:id/edit" component={FoodEditScreen} exact/>
            <Route path="/foods/:pageNumber" component={FoodListScreen} exact/>
            <Route path="/orders" component={OrderListScreen} exact/>
            <Route path="/orders/:id" component={OrderDetailScreen} exact/>
            <Route path="/users" component={UserListScreen} exact/>
            <Route path="/users/:id/edit" component={UserEditScreen} exact/>
            <Route path="/profile" component={ProfileScreen} exact/>
        </Switch>
    )
}

export default MainRoutes