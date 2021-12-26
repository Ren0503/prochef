import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
    LoginScreen,
    RegisterScreen,
} from 'screens/auth'

const AuthRoutes = () => {
    return (
        <Switch>
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
        </Switch>
    )
}

export default AuthRoutes
