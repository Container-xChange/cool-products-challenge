import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OverlayFormInstance } from '@xc/core/interfaces/overlay.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductManualForm, ProductManualFormModel, ProductManualModalForm } from '@xc/core/interfaces/product-manual-form.interface';

@Component({
    selector: 'xc-product-manual-modal',
    templateUrl: './product-manual-modal.component.html',
    styleUrls: ['./product-manual-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductManualModalComponent implements OnInit, OverlayFormInstance<ProductManualFormModel> {
    @Input() send!: (value: ProductManualFormModel) => void;
    @Input() close!: () => void;

    form!: FormGroup<ProductManualModalForm>;

    constructor(private readonly fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    submit(): void {
        if (!this.form.valid) {
            return;
        }

        this.send(this.form.controls.product.getRawValue() as ProductManualFormModel);

        if (!this.form.controls.repeat.value) {
            this.close();
            return;
        }

        this.resetProductForm();
    }

    private initForm(): void {
        this.form = this.fb.group({
            product: this.createProductForm(),
            repeat: this.fb.control(false)
        });
    }

    private createProductForm(): FormGroup<ProductManualForm> {
        return this.fb.group({
            title: this.fb.control('', [Validators.required, Validators.maxLength(100)]),
            category: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
            description: this.fb.control('', [Validators.required, Validators.maxLength(500)]),
            imageUrl: this.fb.control('', [Validators.required, Validators.maxLength(500), Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png)$/)]),
            rating: this.fb.control('', [Validators.required, Validators.pattern(/^\d+\.?\d*$/), Validators.min(1), Validators.max(5)]),
            ratingCount: this.fb.control('', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]),
            price: this.fb.control('', [Validators.required, Validators.pattern(/^\d+\.?\d*$/), Validators.min(1)])
        });

    }

    private resetProductForm(): void {
        this.form.controls.product.reset(this.createProductForm().getRawValue());
        this.form.updateValueAndValidity();
    }
}
