import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListItemModule } from '../product-list-item/product-list-item.module';
import { PageLoaderModule } from '@xc/modules/page-loader/page-loader.module';
import { PortalModule } from '@xc/directives/portal/portal.module';
import { PageErrorModule } from '@xc/modules/page-error/page-error.module';
import { ProductsService } from '@xc/core/services/products.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [ProductListComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ProductListItemModule,
        PageLoaderModule,
        PortalModule,
        PageErrorModule
    ],
    exports: [ProductListComponent],
    providers: [ProductsService]
})
export class ProductListModule {
}
