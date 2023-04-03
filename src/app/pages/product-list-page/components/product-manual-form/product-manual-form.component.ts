import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'xc-product-manual-form',
    templateUrl: './product-manual-form.component.html',
    styleUrls: ['./product-manual-form.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductManualFormComponent {
}
