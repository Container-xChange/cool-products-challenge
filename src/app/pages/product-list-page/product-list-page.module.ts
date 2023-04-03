import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { ProductListPageRoutingModule } from './product-list-page-routing.module';
import { ProductListModule } from '@xc/modules/product-list/product-list.module';
import { ProductListSettingsModule } from '@xc/modules/product-list-settings/product-list-settings.module';
import { ProductsService } from '@xc/core/services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProductListPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ProductListModule,
        ProductListPageRoutingModule,
        ProductListSettingsModule
    ],
    exports: [ProductListPageComponent],
    providers: [ProductsService]
})
export class ProductListPageModule {
}
