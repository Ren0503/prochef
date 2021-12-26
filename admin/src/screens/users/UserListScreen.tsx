import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { Message, Loader } from 'components'
import { listUsers, deleteUser } from 'actions/userActions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'
import {
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Link,
    Button,
    Typography,
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { MainLayout } from 'layouts'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0
    },
}))

interface UserListScreenProps extends RouteComponentProps { }

const UserListScreen = ({ history }: UserListScreenProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { loading, users, error } = useSelector(
        (state: ReduxState) => state.userList
    )
    const { userInfo } = useSelector((state: ReduxState) => state.userLogin)
    const { success: successDelete } = useSelector(
        (state: ReduxState) => state.userDelete
    )

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) dispatch(listUsers())
        else history.push('/login')
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (userId: string) => {
        if (window.confirm('Are you sure')) dispatch(deleteUser(userId))
    }

    const usersListDisplay = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant='error'>{error}</Message>
        else
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>NAME</StyledTableCell>
                                <StyledTableCell>EMAIL</StyledTableCell>
                                <StyledTableCell>ADMIN</StyledTableCell>
                                <StyledTableCell>ACTION</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <StyledTableRow key={user._id}>
                                    <StyledTableCell component="th" scope="row">{user._id}</StyledTableCell>
                                    <StyledTableCell>{user.name}</StyledTableCell>
                                    <StyledTableCell>{user.email}</StyledTableCell>
                                    <StyledTableCell>{user.isAdmin}</StyledTableCell>
                                    <StyledTableCell>
                                        <Link href={`/users/${user._id}/edit`} onClick={(e) => e.preventDefault}>
                                            <Button variant="contained" color="secondary" href="">
                                                <Edit />
                                            </Button>
                                        </Link>
                                        <Button variant="contained" color="primary" onClick={() => deleteHandler(user._id)}>
                                            <Delete />
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
    }

    return (
        <MainLayout>
            <Typography>Users</Typography>
            {usersListDisplay()}
        </MainLayout>
    )
}

export default UserListScreen
