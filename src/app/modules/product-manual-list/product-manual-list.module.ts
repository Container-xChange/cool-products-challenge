import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManualListComponent } from './components/product-manual-list/product-manual-list.component';
import { ProductListItemModule } from '@xc/modules/product-list-item/product-list-item.module';
import { ProductsManualService } from '@xc/core/services/products-manual.service';
import { ProductManualModalUiService } from '@xc/modules/product-manual-modal/services/product-manual-modal-ui.service';
import { PageLoaderModule } from '@xc/modules/page-loader/page-loader.module';
import { PageErrorModule } from '@xc/modules/page-error/page-error.module';
import { PortalModule } from '@xc/directives/portal/portal.module';
import { ProductsManualDbNameToken, ProductsManualStoreNameToken } from '@xc/core/injectors/products-manual-db.injector';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ProductManualListComponent],
    imports: [
        CommonModule,
        RouterModule,
        ProductListItemModule,
        PageLoaderModule,
        PortalModule,
        PageErrorModule
    ],
    exports: [ProductManualListComponent],
    providers: [
        ProductsManualService,
        ProductManualModalUiService,
        {
            provide: ProductsManualDbNameToken,
            useValue: 'productDB'
        },
        {
            provide: ProductsManualStoreNameToken,
            useValue: 'products'
        }
    ]
})
export class ProductManualListModule {
}
