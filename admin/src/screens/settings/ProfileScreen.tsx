import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getUserDetail, updateUserProfile } from 'actions/userActions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'
import { Loader, Message } from 'components'
import { MainLayout } from 'layouts'
import { UserUpdateProfileActionTypes } from 'types/users'
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material'
import { LockClockOutlined } from '@mui/icons-material'

interface ProfileScreenProps extends RouteComponentProps { }

const ProfileScreen = ({ history }: ProfileScreenProps) => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [message, setMessage] = useState<string>()
    const [updateMessage, setUpdateMessage] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()
    const { user, loading, error } = useSelector(
        (state: ReduxState) => state.userDetail
    )
    const { userInfo } = useSelector((state: ReduxState) => state.userLogin)
    const { success } = useSelector(
        (state: ReduxState) => state.userUpdateProfile
    )

    useEffect(() => {
        if (!userInfo) history.push('/login')
        else {
            if (success) setUpdateMessage(true)
            if (!user || success) {
                dispatch(getUserDetail('profile'))
                dispatch({
                    type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET
                })
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user, success])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) setMessage('Password do not match')
        else {
            if (!user) return
            dispatch(
                updateUserProfile({
                    _id: user._id,
                    name,
                    email,
                    isAdmin: user.isAdmin,
                    password
                })
            )
        }
    }

    return (
        <MainLayout>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockClockOutlined />
            </Avatar>
            <Typography>User Profile</Typography>
            {message && <Message variant='error'>{message}</Message>}
            { }
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='error'>{error}</Message>
            ) : (
                <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="User Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            )}
        </MainLayout>
    )
}

export default ProfileScreen
