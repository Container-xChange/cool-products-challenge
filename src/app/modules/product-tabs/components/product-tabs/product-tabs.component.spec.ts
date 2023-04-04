import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTabsComponent } from './product-tabs.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductTabsComponent', () => {
    let component: ProductTabsComponent;
    let fixture: ComponentFixture<ProductTabsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductTabsComponent],
            imports: [RouterTestingModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductTabsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
