import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManualListPageComponent } from './product-manual-list-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductManualListPageComponent', () => {
    let component: ProductManualListPageComponent;
    let fixture: ComponentFixture<ProductManualListPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductManualListPageComponent],
            imports: [RouterTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductManualListPageComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
