export interface Food {
	_id: string
	name: string
	image: string
	description: string
	category: string
	price: number
	countInStock: number
	views: number
	rating: number
	numReviews: number
}

export interface Review {
	_id: string
	user: string
	name: string
	rating: number
	comment: string
	createdAt: string
}

export interface FoodList {
    foods: Food[]
    pages: number
    page: number
}

export interface FoodDetail extends Food {
    reviews: Array<Review>
}

export interface CreateReviewInput {
	rating: number
	comment: string
}