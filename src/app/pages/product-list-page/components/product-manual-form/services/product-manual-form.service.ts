import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductManualFormGroup } from '../../../interfaces/product-manual-form.interface';

@Injectable()
export class ProductManualFormService {
    form!: FormGroup<ProductManualFormGroup>;

    constructor(private readonly fb: FormBuilder) {
        this.initForm();
    }

    private initForm(): void {
        this.form = this.fb.group({
            title: [''],
            category: [''],
            description: [''],
            imageUrl: [''],
            rating: [''],
            ratingCount: [''],
            price: ['']
        });
    }
}
