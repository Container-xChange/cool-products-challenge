import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManualModalComponent } from './product-manual-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductManualFormComponent } from '../../components/product-manual-form/product-manual-form.component';

describe('ProductManualModalComponent', () => {
    let component: ProductManualModalComponent;
    let fixture: ComponentFixture<ProductManualModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductManualModalComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                ProductManualFormComponent
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductManualModalComponent);
        component = fixture.componentInstance;

        component.send = jest.fn();
        component.close = jest.fn();
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

});
