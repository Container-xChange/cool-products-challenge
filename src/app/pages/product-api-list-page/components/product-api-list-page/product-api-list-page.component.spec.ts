import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductApiListPageComponent } from './product-api-list-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ProductListSettingsModule } from '@xc/modules/product-list-settings/product-list-settings.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductApiListPageComponent', () => {
    let component: ProductApiListPageComponent;
    let fixture: ComponentFixture<ProductApiListPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductApiListPageComponent],
            imports: [FormsModule, RouterTestingModule, ProductListSettingsModule],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductApiListPageComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
