import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Avatar,
    Box,
    Typography,
    TextField,
    Button,
} from '@mui/material'
import { AuthLayout } from 'layouts'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'
import LockOutlined from '@mui/icons-material/LockOutlined'
import { RouteComponentProps } from 'react-router-dom'
import { login } from 'actions/userActions'
import { Loader, Message } from 'components'

interface LoginScreenProps extends RouteComponentProps { }

const LoginScreen = ({ location: { search }, history }: LoginScreenProps) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()

    const userLogin = useSelector((state: ReduxState) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push('/')
        }
    }, [history, userInfo])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <AuthLayout>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlined />
            </Avatar>
            <Typography>
                Login
            </Typography>
            {error && <Message variant="error">{error}</Message>}
            {loading && <Loader />}
            <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </Box>
        </AuthLayout>
    )
}

export default LoginScreen
