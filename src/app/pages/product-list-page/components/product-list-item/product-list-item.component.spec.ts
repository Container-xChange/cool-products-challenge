import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListItemComponent } from './product-list-item.component';

describe('ProductListItemComponent', () => {
    let component: ProductListItemComponent;
    let fixture: ComponentFixture<ProductListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductListItemComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductListItemComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
