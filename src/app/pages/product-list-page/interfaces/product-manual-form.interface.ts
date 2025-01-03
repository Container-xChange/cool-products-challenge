import { FormControl } from "@angular/forms";

export interface ProductManualFormModel {
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    rating: string;
    ratingCount: string;
    price: string;
}

export interface ProductManualFormGroup {
    title: FormControl<string | null>;
    category: FormControl<string | null>;
    description: FormControl<string | null>;
    imageUrl: FormControl<string | null>;
    rating: FormControl<string | null>;
    ratingCount: FormControl<string | null>;
    price: FormControl<string | null>;
}
