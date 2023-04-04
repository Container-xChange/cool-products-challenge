import { ProductManualFormModel, ProductManualModalFormModel } from '@xc/core/interfaces/product-manual-form.interface';

export const productManualFormValueMock = (): ProductManualFormModel => ({
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    category: 'men\'s clothing',
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday.',
    imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: '3.9',
    ratingCount: '120',
    price: '109.95'
});

export const productManualFormEmptyValueMock = (): ProductManualFormModel => ({
    title: '',
    category: '',
    description: '',
    imageUrl: '',
    rating: '',
    ratingCount: '',
    price: ''
});

export const productManualModalFormValueMock = (product: ProductManualFormModel, repeat = false): ProductManualModalFormModel => ({
    product,
    repeat
});
