import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OverlayFormInstance } from '../../../../core/interfaces/overlay.interface';
import { ProductManualFormGroup, ProductManualFormModel } from '../../interfaces/product-manual-form.interface';
import { ProductManualFormService } from '../../components/product-manual-form/services/product-manual-form.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'xc-product-manual-modal',
    templateUrl: './product-manual-modal.component.html',
    styleUrls: ['./product-manual-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ProductManualFormService]
})
export class ProductManualModalComponent implements OverlayFormInstance<ProductManualFormModel> {
    @Input() send!: (value: ProductManualFormModel) => void;
    @Input() close!: () => void;

    get form(): FormGroup<ProductManualFormGroup> {
        return this.productManualFormService.form;
    }

    constructor(private readonly productManualFormService: ProductManualFormService) {
    }

    submitForm(): void {
        if (this.form.invalid) {
            console.error('Form is invalid');
            return;
        }
        this.send(this.form.value as ProductManualFormModel);
        this.close();
    }
}
