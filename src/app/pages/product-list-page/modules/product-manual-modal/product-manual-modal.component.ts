import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OverlayFormInstance } from '../../../../core/interfaces/overlay.interface';
import { ProductManualFormModel } from '../../interfaces/product-manual-form.interface';

@Component({
    selector: 'xc-product-manual-modal',
    templateUrl: './product-manual-modal.component.html',
    styleUrls: ['./product-manual-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductManualModalComponent implements OverlayFormInstance<ProductManualFormModel> {
    @Input() send!: (value: ProductManualFormModel) => void;
    @Input() close!: () => void;
}
