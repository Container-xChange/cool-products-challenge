import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductManualFormGroup } from '../../interfaces/product-manual-form.interface';
import { ProductManualFormService } from './services/product-manual-form.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'xc-product-manual-form',
    templateUrl: './product-manual-form.component.html',
    styleUrls: ['./product-manual-form.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, NgOptimizedImage],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductManualFormComponent {
    get form(): FormGroup<ProductManualFormGroup> {
        return this.productManualFormService.form;
    }

    constructor(private readonly productManualFormService: ProductManualFormService) {
    }
}
