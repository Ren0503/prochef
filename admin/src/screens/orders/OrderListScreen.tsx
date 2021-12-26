import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { Message, Loader } from 'components'
import { listOrders } from 'actions/orderActions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'
import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Link,
    Button,
    Typography,
} from '@mui/material'
import { ViewAgenda, Cancel } from '@mui/icons-material'
import { MainLayout } from 'layouts'
import { StyledTableCell, StyledTableRow } from 'components'

interface OrderListScreenProps extends RouteComponentProps { }

const OrderListScreen = ({ history }: OrderListScreenProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const { loading, orders, error } = useSelector(
        (state: ReduxState) => state.orderList
    )
    const { userInfo } = useSelector((state: ReduxState) => state.userLogin)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) dispatch(listOrders())
        else history.push('/login')
    }, [dispatch, history, userInfo])

    const orderListDisplay = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant='error'>{error}</Message>
        else
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>USER</StyledTableCell>
                                <StyledTableCell>DATE</StyledTableCell>
                                <StyledTableCell>PRICE</StyledTableCell>
                                <StyledTableCell>PAID</StyledTableCell>
                                <StyledTableCell>DELIVERED</StyledTableCell>
                                <StyledTableCell>ACTION</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <StyledTableRow key={order._id}>
                                    <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                                    <StyledTableCell>{order.user && order.user.name}</StyledTableCell>
                                    <StyledTableCell>
                                        {order.createdAt.substring(0, 10)}
                                    </StyledTableCell>
                                    <StyledTableCell>$ {order.totalPrice}</StyledTableCell>
                                    <StyledTableCell>
                                        {order.isPaid ? (
                                            order.paidAt?.substring(0, 10)
                                        ) : (
                                            <Cancel />
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {order.isDelivered ? (
                                            order.deliveredAt?.substring(0, 10)
                                        ) : (
                                            <Cancel />
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Link href={`/orders/${order._id}`} onClick={(e) => e.preventDefault}>
                                            <Button variant="contained" color="secondary" href="">
                                                <ViewAgenda />
                                            </Button>
                                        </Link>
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
            <Typography>Orders List</Typography>
            {orderListDisplay()}
        </MainLayout>
    )
}

export default OrderListScreen
