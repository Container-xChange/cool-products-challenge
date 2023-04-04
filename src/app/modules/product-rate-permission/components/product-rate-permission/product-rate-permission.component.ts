import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsRatePermissionService } from '@xc/core/services/products-rate-permission.service';

@Component({
    selector: 'xc-product-rate-permission',
    templateUrl: './product-rate-permission.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRatePermissionComponent {
    constructor(public readonly permissionService: ProductsRatePermissionService) {
    }
}
