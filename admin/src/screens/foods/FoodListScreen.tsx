import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { Message, Loader } from 'components'
import { listFoods, deleteFood, createFood } from 'actions/foodActions'
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
import { Edit, Delete } from '@mui/icons-material'
import { FoodCreateActionTypes } from 'types/foods'
import { MainLayout } from 'layouts'
import { StyledTableCell, StyledTableRow } from 'components'

interface MatchParams {
    pageNumber: string
}

interface FoodListScreenProps extends RouteComponentProps<MatchParams> { }

const FoodListScreen = ({
    history,
    match: {
        params: { pageNumber: pgNumber }
    }
}: FoodListScreenProps) => {
    const pageNumber = pgNumber || '1'
    const dispatch = useDispatch<AppDispatch>()
    const { loading, foods, error, page, pages } = useSelector(
        (state: ReduxState) => state.foodList
    )
    const { userInfo } = useSelector((state: ReduxState) => state.userLogin)
    const { success, loading: loadingDelete, error: errorDelete } = useSelector(
        (state: ReduxState) => state.foodDelete
    )

    const {
        success: successCreate,
        food: createdFood,
        loading: loadingCreate,
        error: errorCreate
    } = useSelector((state: ReduxState) => state.foodCreate)

    useEffect(() => {
        dispatch({ type: FoodCreateActionTypes.FOOD_CREATE_RESET })

        if (!userInfo?.isAdmin)
            history.push('/login')
        if (successCreate && createdFood) {
            history.push(`/food/${createdFood._id}/edit`)
        } else dispatch(listFoods('', pageNumber))
    }, [
        dispatch,
        history,
        userInfo,
        success,
        successCreate,
        createdFood,
        pageNumber
    ])

    const deleteHandler = (id: string) => {
        if (window.confirm('Are you sure delete food?')) {
            dispatch(deleteFood(id))
        }
    }

    const createFoodHandler = () => {
        dispatch(createFood())
    }

    const foodsListDisplay = () => {
        if (loading || loadingDelete || loadingCreate) return <Loader />
        else if (error) return <Message variant='error'>{error}</Message>
        else if (errorCreate)
            return <Message variant='error'>{errorCreate}</Message>
        else if (errorDelete)
            return <Message variant='error'>{errorDelete}</Message>
        else
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>NAME</StyledTableCell>
                                <StyledTableCell>IMAGE</StyledTableCell>
                                <StyledTableCell>PRICE</StyledTableCell>
                                <StyledTableCell>CATEGORY</StyledTableCell>
                                <StyledTableCell>ACTION</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {foods.map((food, index) => (
                                <StyledTableRow key={food._id}>
                                    <StyledTableCell component="th" scope="row">{index + 1}</StyledTableCell>
                                    <StyledTableCell>{food.name}</StyledTableCell>
                                    <StyledTableCell>
                                        <img
                                            src={food.image}
                                            alt="Paella dish"
                                            width="80"
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>$ {food.price}</StyledTableCell>
                                    <StyledTableCell>
                                        <Link href={`/food/${food._id}/edit`} onClick={(e) => e.preventDefault}>
                                            <Button variant="contained" color="secondary" href="">
                                                <Edit />
                                            </Button>
                                        </Link>
                                        <Button variant="contained" color="primary" onClick={() => deleteHandler(food._id)}>
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
            <Typography>Foods</Typography>
            {foodsListDisplay()}
        </MainLayout>
    )
}

export default FoodListScreen
