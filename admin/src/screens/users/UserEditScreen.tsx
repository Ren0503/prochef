import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { getUserDetail, updateUser } from 'actions/userActions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'
import { UserUpdateActionTypes } from 'types/users'
import { Loader, Message } from 'components'
import { Box, Button, Checkbox, Grid, TextField, Typography } from '@mui/material'
import { MainLayout } from 'layouts'

interface MatchParams {
    id: string
}

interface UserEditScreenProps extends RouteComponentProps<MatchParams> { }

const UserEditScreen = ({
    match: {
        params: { id }
    },
    history
}: UserEditScreenProps) => {
    const userId = id
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()
    const { user, loading, error } = useSelector(
        (state: ReduxState) => state.userDetail
    )
    const { loading: loadingUpdate, error: errorUpdate, success } = useSelector(
        (state: ReduxState) => state.userUpdate
    )

    useEffect(() => {
        if (success) {
            dispatch({ type: UserUpdateActionTypes.USER_UPDATE_RESET })
            history.push('/users')
        } else {
            if (!user || user._id !== userId) dispatch(getUserDetail(userId))
            else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, user, userId, success, history])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    const userDetailDisplay = () => {
        if (loading || loadingUpdate) return <Loader />
        else if (error) return <Message variant='error'>{error}</Message>
        else if (errorUpdate)
            return <Message variant='error'>{errorUpdate}</Message>
        else
            return (
                <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Enter Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Enter Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
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
            )
    }

    return (
        <MainLayout>
            <Typography>Edit User</Typography>
            {userDetailDisplay()}
        </MainLayout>
    )
}

export default UserEditScreen
