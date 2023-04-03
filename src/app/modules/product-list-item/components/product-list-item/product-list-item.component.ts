import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductItem } from '@xc/core/interfaces/product-item.interface';

@Component({
    selector: 'xc-product-list-item',
    templateUrl: './product-list-item.component.html',
    styleUrls: ['./product-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListItemComponent {
    @Input() product!: ProductItem;
}
