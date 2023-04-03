import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'xc-product-list-settings',
    templateUrl: './product-list-settings.component.html',
    styleUrls: ['./product-list-settings.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListSettingsComponent {
}
