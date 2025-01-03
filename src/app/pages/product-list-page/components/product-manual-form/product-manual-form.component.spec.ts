import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManualFormComponent } from './product-manual-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductManualFormService } from './services/product-manual-form.service';

describe('ProductManualFormComponent', () => {
    let component: ProductManualFormComponent;
    let fixture: ComponentFixture<ProductManualFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                ProductManualFormComponent
            ],
            providers: [ProductManualFormService]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductManualFormComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

});
