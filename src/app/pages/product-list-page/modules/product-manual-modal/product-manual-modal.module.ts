import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManualModalComponent } from './product-manual-modal.component';
import { ProductManualModalUiService } from './services/product-manual-modal-ui.service';
import { ProductManualFormComponent } from '../../components/product-manual-form/product-manual-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProductManualModalComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProductManualFormComponent
    ],
    exports: [ProductManualModalComponent],
    providers: [ProductManualModalUiService]
})
export class ProductManualModalModule {
}
