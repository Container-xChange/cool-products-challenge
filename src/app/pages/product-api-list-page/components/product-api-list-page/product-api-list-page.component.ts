import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'xc-product-api-list-page',
    templateUrl: './product-api-list-page.component.html',
    styleUrls: ['./product-api-list-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductApiListPageComponent {
    count = environment.DEFAULT_PRODUCTS_COUNT;
    readonly minCount = environment.DEFAULT_PRODUCTS_MIN_COUNT;
    readonly maxCount = environment.DEFAULT_PRODUCTS_MAX_COUNT;
}
