import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRateFormComponent } from './components/product-rate-form/product-rate-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProductRateFormComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [ProductRateFormComponent]
})
export class ProductRateFormModule {
}
