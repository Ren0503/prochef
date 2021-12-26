import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { detailFood, updateFood } from 'actions/foodActions'
import { AppDispatch } from 'store'
import { ReduxState } from 'types/ReduxState'
import { FoodUpdateActionTypes } from 'types/foods'
import axios from 'axios'
import { Loader, Message } from 'components'
import {
    Box,
    Button,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import { MainLayout } from 'layouts'

interface MatchParams {
    id: string
}

interface FoodEditScreenProps extends RouteComponentProps<MatchParams> { }

const FoodEditScreen = ({
    match: {
        params: { id }
    },
    history
}: FoodEditScreenProps) => {
    const foodId = id
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [image, setImage] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [countInStock, setCountInStock] = useState<number>(0)
    const [uploading, setUploading] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()
    const { food, loading, error } = useSelector(
        (state: ReduxState) => state.foodDetail
    )

    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = useSelector((state: ReduxState) => state.foodUpdate)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: FoodUpdateActionTypes.FOOD_UPDATE_RESET })
            history.push(`/foods`)
        } else {
            if (!food)
                dispatch(detailFood(foodId))
            else {
                setName(food.name)
                setPrice(food.price)
                setImage(food.image)
                setDescription(food.description)
                setCategory(food.category)
                setCountInStock(food.countInStock)
            }
        }
    }, [dispatch, food, foodId, history, successUpdate])

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(
            updateFood({
                _id: foodId,
                name,
                price,
                category,
                countInStock,
                description,
                image
            })
        )
    }

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('food_id', foodId)

        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/foods/upload/', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const foodDetailDisplay = () => {
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
                                type="number"
                                required
                                fullWidth
                                id="price"
                                label="Enter Price"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(parseInt(e.target.value))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="image"
                                label="Enter Image Url"
                                name="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <input
                                accept="image/*"
                                id="icon-button-file"
                                type="file"
                                onChange={uploadFileHandler}
                            />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                            {uploading && <Loader />}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="category"
                                label="Enter Category"
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                type="number"
                                required
                                fullWidth
                                id="countInStock"
                                label="Enter Count In Stock"
                                name="number"
                                value={countInStock}
                                onChange={(e) => setCountInStock(parseInt(e.target.value))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                rows={4}
                                id="description"
                                label="Enter Description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
            <Typography>Edit Food</Typography>
            {foodDetailDisplay()}
        </MainLayout>
    )
}

export default FoodEditScreen
