import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRatePermissionComponent } from './components/product-rate-permission/product-rate-permission.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProductRatePermissionComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [ProductRatePermissionComponent]
})
export class ProductRatePermissionModule {
}
