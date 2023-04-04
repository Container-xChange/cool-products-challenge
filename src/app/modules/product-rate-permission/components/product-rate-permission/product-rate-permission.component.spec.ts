import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRatePermissionComponent } from './product-rate-permission.component';
import { FormsModule } from '@angular/forms';
import { ProductsRatePermissionService } from '@xc/core/services/products-rate-permission.service';
import { EMPTY } from 'rxjs';

describe('ProductRatePermissionComponent', () => {
    let component: ProductRatePermissionComponent;
    let fixture: ComponentFixture<ProductRatePermissionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductRatePermissionComponent],
            imports: [FormsModule],
            providers: [
                {
                    provide: ProductsRatePermissionService,
                    useValue: {
                        allow$: EMPTY,
                        update: jest.fn()
                    }
                }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductRatePermissionComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
