import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManualListPageComponent } from './components/product-manual-list-page/product-manual-list-page.component';
import { ProductManualListModule } from '@xc/modules/product-manual-list/product-manual-list.module';
import { RouterModule } from '@angular/router';
import { ProductRatePermissionModule } from '@xc/modules/product-rate-permission/product-rate-permission.module';
import { canActivateIfProductExist } from '@xc/pages/product-manual-list-page/guards/product-exist.guard';
import { canActivateIfHasPermission } from '@xc/pages/product-manual-list-page/guards/product-rate-permission.guard';

@NgModule({
    declarations: [ProductManualListPageComponent],
    imports: [
        CommonModule,
        ProductManualListModule,
        ProductRatePermissionModule,
        RouterModule.forChild([
            {
                path: '',
                component: ProductManualListPageComponent
            },
            {
                path: ':id',
                loadChildren: () => import('../product-manual-rate-page/product-manual-rate-page.module')
                    .then((m) => m.ProductManualRatePageModule),
                canActivate: [canActivateIfHasPermission, canActivateIfProductExist]
            }
        ])
    ],
    exports: [ProductManualListPageComponent]
})
export class ProductManualListPageModule {
}
