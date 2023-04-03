import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'xc-product-list-page',
    templateUrl: './product-list-page.component.html',
    styleUrls: ['./product-list-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListPageComponent {
}
