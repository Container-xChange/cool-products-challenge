import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductItem } from '@xc/core/interfaces/product-item.interface';

@Component({
    selector: 'xc-product-rate-form',
    templateUrl: './product-rate-form.component.html',
    styleUrls: ['./product-rate-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRateFormComponent implements OnInit {

    @Input() product!: ProductItem;

    @Output() productChange: EventEmitter<ProductItem> = new EventEmitter();

    rating!: FormControl<string | null>;

    constructor(private readonly fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    rate(): void {
        if (this.rating.invalid) {
            return;
        }

        this.productChange.emit({
            ...this.product,
            rating: {
                rate: (this.product.rating.rate * this.product.rating.count + +this.rating.getRawValue()!) / (this.product.rating.count + 1),
                count: this.product.rating.count + 1
            }
        });

        this.rating.reset('');
    }

    private initForm(): void {
        this.rating = this.fb.control('', [Validators.required, Validators.pattern(/^\d+\.?\d*$/), Validators.min(1), Validators.max(5)]);
    }

}
