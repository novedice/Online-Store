export interface IProduct {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
    quantity?: number;
}

export interface ItemInBasket extends IProduct {
    quantity: number
}

export interface IBasket {
    productsInBascket: ItemInBasket[]
}