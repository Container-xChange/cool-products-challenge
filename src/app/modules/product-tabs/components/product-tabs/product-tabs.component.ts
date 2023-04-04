import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'xc-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTabsComponent {
    constructor(public readonly route: ActivatedRoute) {
    }
}
