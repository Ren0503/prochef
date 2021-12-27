export interface Cart {
    food: string
    name: string
    image: string
    price: number
    countInStock: number
    quantity: number
}

export interface ShippingAddress {
    address: string
    city: string
    postalCode: string
    country: string
}

export interface PaymentResult {
    id: string
    status: string
    update_time: string
    email_address: string
}

export interface OrderInput {
    orderItems: Cart[]
    shippingAddress: ShippingAddress
    paymentMethod: string
}

export interface Order extends OrderInput {
    itemsPrice: number
    taxPrice: number
    shippingPrice: number
    totalPrice: number
}

export interface OrderDetail extends Order {
    _id: string
    user: string
    createdAt: string
    updatedAt: string
}

export interface PayData {
    paymentResult: PaymentResult
    orderId: string
}