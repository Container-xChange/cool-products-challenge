import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { ProductListPageRoutingModule } from './product-list-page-routing.module';

@NgModule({
    declarations: [ProductListPageComponent],
    imports: [
        CommonModule,
        ProductListPageRoutingModule
    ],
    exports: [ProductListPageComponent]
})
export class ProductListPageModule {
}
