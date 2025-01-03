import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';

@NgModule({
    declarations: [ProductListItemComponent],
    imports: [CommonModule],
    exports: [ProductListItemComponent]
})
export class ProductListItemModule {
}
