import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManualFormComponent } from './components/product-manual-form/product-manual-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProductManualFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [ProductManualFormComponent]
})
export class ProductManualFormModule {
}
