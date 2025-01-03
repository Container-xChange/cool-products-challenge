import { ProductManualFormModel } from '../interfaces/product-manual-form.interface';
import { ProductItem } from '../interfaces/product-item.interface';

export const toProductItem = (result: ProductManualFormModel, id: number): ProductItem => ({
    id,
    title: result.title,
    category: result.category,
    description: result.description,
    price: +result.price,
    image: result.imageUrl,
    rating: {
        rate: +result.rating,
        count: +result.ratingCount
    }
});
