import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTabsComponent } from './components/product-tabs/product-tabs.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ProductTabsComponent],
    imports: [CommonModule, RouterModule],
    exports: [ProductTabsComponent]
})
export class ProductTabsModule {
}
