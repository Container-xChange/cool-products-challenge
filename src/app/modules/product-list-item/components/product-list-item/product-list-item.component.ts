import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'xc-product-list-item',
    templateUrl: './product-list-item.component.html',
    styleUrls: ['./product-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListItemComponent {
}
