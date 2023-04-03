import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPageComponent } from './product-list-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductListPageComponent', () => {
    let component: ProductListPageComponent;
    let fixture: ComponentFixture<ProductListPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductListPageComponent],
            imports: [RouterTestingModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductListPageComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
