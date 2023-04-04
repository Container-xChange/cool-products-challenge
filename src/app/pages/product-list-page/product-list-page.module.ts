import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { ProductListPageRoutingModule } from './product-list-page-routing.module';
import { ProductTabsModule } from '@xc/modules/product-tabs/product-tabs.module';

@NgModule({
    declarations: [ProductListPageComponent],
    imports: [
        CommonModule,
        ProductTabsModule,
        ProductListPageRoutingModule
    ],
    exports: [ProductListPageComponent]
})
export class ProductListPageModule {
}
