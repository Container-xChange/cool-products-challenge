import { ProductRating } from './product-rating.interface';

export interface ProductItem {
    id : number;
    title: string;
    category: string;
    description: string;
    price: number;
    image: string;
    rating: ProductRating;
}
