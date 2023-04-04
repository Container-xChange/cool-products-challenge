import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductApiListPageComponent } from './components/product-api-list-page/product-api-list-page.component';
import { ProductListModule } from '@xc/modules/product-list/product-list.module';
import { ProductListSettingsModule } from '@xc/modules/product-list-settings/product-list-settings.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProductApiListPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ProductListModule,
        ProductListSettingsModule,
        RouterModule.forChild([{ path: '', component: ProductApiListPageComponent }])
    ],
    exports: [ProductApiListPageComponent]
})
export class ProductApiListPageModule {
}
