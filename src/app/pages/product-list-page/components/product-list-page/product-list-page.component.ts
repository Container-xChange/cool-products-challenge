import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'xc-product-list-page',
    templateUrl: './product-list-page.component.html',
    styleUrls: ['./product-list-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListPageComponent {
    count = environment.DEFAULT_PRODUCTS_COUNT;
    readonly minCount = environment.DEFAULT_PRODUCTS_MIN_COUNT;
    readonly maxCount = environment.DEFAULT_PRODUCTS_MAX_COUNT;
}
