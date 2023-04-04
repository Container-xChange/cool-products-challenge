import { FormControl, FormGroup } from '@angular/forms';

export type ProductManualForm = {
    [key in keyof ProductManualFormModel]: FormControl<ProductManualFormModel[key] | null>;
};

export interface ProductManualModalForm {
    product: FormGroup<ProductManualForm>;
    repeat: FormControl<boolean | null>;
}

export interface ProductManualFormModel {
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    rating: string;
    ratingCount: string;
    price: string;
}

export interface ProductManualModalFormModel {
    product: ProductManualFormModel;
    repeat: boolean;
}
