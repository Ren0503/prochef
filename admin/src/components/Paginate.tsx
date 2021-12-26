import React from 'react'
import { Stack, Pagination, PaginationItem } from '@mui/material'
import { Link } from 'react-router-dom'

interface PaginateProps {
    pages: number
    page: number
    category: string
}

const Paginate = ({
    page,
    pages,
    category,
}: PaginateProps) => {
    return (
        <>
            {pages > 1 && (
                <Stack spacing={2}>
                    <Pagination
                        page={page}
                        count={pages}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`/${category}/${item.page}`}
                                {...item}
                            />
                        )}
                    />
                </Stack>
            )}
        </>
    )
}

export default Paginate
