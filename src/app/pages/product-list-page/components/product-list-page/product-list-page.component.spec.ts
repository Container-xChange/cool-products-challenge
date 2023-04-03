import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPageComponent } from './product-list-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductListSettingsModule } from '@xc/modules/product-list-settings/product-list-settings.module';

describe('ProductListPageComponent', () => {
    let component: ProductListPageComponent;
    let fixture: ComponentFixture<ProductListPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductListPageComponent],
            imports: [FormsModule, RouterTestingModule, ProductListSettingsModule],
            schemas: [NO_ERRORS_SCHEMA]
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
