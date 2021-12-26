import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { getOrderDetail, deliverOrder } from 'actions/orderActions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'
import { Loader, Message } from 'components'
import { 
    Box, 
    Button, 
    Avatar, 
    Grid, 
    List, 
    ListSubheader, 
    Paper, 
    ListItem,
    ListItemText, 
    ListItemIcon,
    ListItemAvatar,
    Typography,
    Collapse,
    ButtonBase
} from '@mui/material'
import { MainLayout } from 'layouts'
import { OrderDeliverActionTypes } from 'types/orders'
import { 
    CropFree, 
    ExpandLess, 
    ExpandMore, 
    Home, 
    LocalActivity, 
    LocalOffer, 
    LocalShipping, 
    MonetizationOn, 
    Payment, 
    Public,
} from '@mui/icons-material'

interface MatchParams {
    id: string
}

interface OrderDetailScreenProps extends RouteComponentProps<MatchParams> { }

const OrderDetailScreen = ({
    match: {
        params: { id }
    },
    history
}: OrderDetailScreenProps) => {
    const orderId = id
    const [open, setOpen] = useState(true)
    const [sdkReady, setSdkReady] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()

    const { userInfo } = useSelector((state: ReduxState) => state.userLogin)

    const { order, loading, error } = useSelector(
        (state: ReduxState) => state.orderDetail
    )

    const { loading: loadingDeliver, success: successDeliver } = useSelector(
        (state: ReduxState) => state.orderDeliver
    )

    useEffect(() => {
        if (!userInfo) history.push('/login')

        if (successDeliver || !order || order._id !== orderId) {
            dispatch({ type: OrderDeliverActionTypes.ORDER_DELIVER_RESET })
            dispatch(getOrderDetail(orderId))
        }
    }, [dispatch, order, orderId, successDeliver, userInfo, history])

    const deliverHandler = () => {
        dispatch(deliverOrder(orderId))
    }

    const addDecimals = (num: number) => (Math.round(num * 100) / 100).toFixed(2)
 
    const handleClick = () => {
        setOpen(!open)
    }

    const displayOrderDetail = () => {
        if (loading) return <Loader />
        else if (error || !order)
            return <Message variant='error'>{error}</Message>
        else
            return (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper>
                            <List
                                component="nav"
                                aria-labelledby="ship-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="ship-list-subheader">
                                        Shipping
                                    </ListSubheader>
                                }
                            >
                                <ListItem>
                                    <ListItemText primary={order.user.name} secondary={order.user.email} />
                                </ListItem>
                                <ListItem button onClick={handleClick}>
                                    <ListItemIcon>
                                        <Home />
                                    </ListItemIcon>
                                    <ListItemText primary="Address" secondary={order.shippingAddress.address} />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <LocalActivity />
                                            </ListItemIcon>
                                            <ListItemText primary={order.shippingAddress.city} />
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <CropFree />
                                            </ListItemIcon>
                                            <ListItemText primary={order.shippingAddress.postalCode} />
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemIcon>
                                                <Public />
                                            </ListItemIcon>
                                            <ListItemText primary={order.shippingAddress.country} />
                                        </ListItem>
                                    </List>
                                </Collapse>
                                <ListItem>
                                    {order.isDelivered ? (
                                        <Message variant='success'>
                                            Delivered on {order.deliveredAt}
                                        </Message>
                                    ) : (
                                        <Message variant='error'>Not Delivered</Message>
                                    )}
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper>
                            <List
                                component="nav"
                                aria-labelledby="payment-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="payment-list-subheader">
                                        Payment Method
                                    </ListSubheader>
                                }
                            >
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Payment />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={order.paymentMethod} />
                                </ListItem>
                                <ListItem>
                                    {order.isPaid ? (
                                        <Message variant='success'>Paid on {order.paidAt}</Message>
                                    ) : (
                                        <Message variant='error'>Not Paid</Message>
                                    )}
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper>
                            <List
                                component="nav"
                                aria-labelledby="items-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="items-list-subheader">
                                        Order Items
                                    </ListSubheader>
                                }
                            >
                                {order.orderItems.length === 0 ? (
                                    <Message variant='info'>Order is empty</Message>
                                ) : (
                                    <List>
                                        {order.orderItems.map((item, index) => (
                                            <ListItem key={index}>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <ButtonBase>
                                                            <img alt={item.name} src={item.image} />
                                                        </ButtonBase>
                                                    </Grid>
                                                    <Grid item xs={12} sm container>
                                                        <Grid item xs container direction="column" spacing={2}>
                                                            <Grid item xs>
                                                                <Typography variant="body2" gutterBottom>
                                                                    {item.name}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary">
                                                                    {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </List>
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Order Summary
                                    </ListSubheader>
                                }
                            >
                                <ListItem button>
                                    <ListItemIcon>
                                        <MonetizationOn />
                                    </ListItemIcon>
                                    <ListItemText primary={order.itemsPrice} />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <LocalShipping />
                                    </ListItemIcon>
                                    <ListItemText primary={order.shippingPrice} />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <LocalOffer />
                                    </ListItemIcon>
                                    <ListItemText primary={order.taxPrice} />
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Payment />
                                    </ListItemIcon>
                                    <ListItemText primary={order.totalPrice} />
                                </ListItem>
                                {loadingDeliver && <Loader />}
                                {userInfo &&
                                    userInfo.isAdmin &&
                                    order.isPaid &&
                                    !order.isDelivered && (
                                        <ListItem>
                                            <Button
                                                type='button'
                                                className='btn btn-block'
                                                onClick={deliverHandler}
                                            >
                                                Mark As Delivered
                                            </Button>
                                        </ListItem>
                                    )}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            )
    }

    return (
        <MainLayout>
            <Typography>Order Detail</Typography>
            {displayOrderDetail()}
        </MainLayout>
    )
}

export default OrderDetailScreen
