import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManualModalComponent } from './components/product-manual-modal/product-manual-modal.component';
import { ProductManualFormModule } from '@xc/modules/product-manual-form/product-manual-form.module';
import { FormModalModule } from '@xc/modules/form-modal/form-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProductManualModalComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormModalModule,
        ProductManualFormModule
    ],
    exports: [ProductManualModalComponent]
})
export class ProductManualModalModule {
}
