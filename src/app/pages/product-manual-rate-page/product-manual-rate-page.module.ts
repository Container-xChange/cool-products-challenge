import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManualRatePageComponent } from './components/product-manual-rate-page/product-manual-rate-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListItemModule } from '@xc/modules/product-list-item/product-list-item.module';
import { RouterModule } from '@angular/router';
import { ProductRateFormModule } from '@xc/modules/product-rate-form/product-rate-form.module';

@NgModule({
    declarations: [ProductManualRatePageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProductListItemModule,
        ProductRateFormModule,
        RouterModule.forChild([{ path: '', component: ProductManualRatePageComponent }])
    ],
    exports: [ProductManualRatePageComponent]
})
export class ProductManualRatePageModule {
}
