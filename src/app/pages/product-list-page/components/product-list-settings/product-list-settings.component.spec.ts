import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListSettingsComponent } from './product-list-settings.component';

describe('ProductListSettingsComponent', () => {
    let component: ProductListSettingsComponent;
    let fixture: ComponentFixture<ProductListSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductListSettingsComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductListSettingsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
