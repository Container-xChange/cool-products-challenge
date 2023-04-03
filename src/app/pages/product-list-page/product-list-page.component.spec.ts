import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPageComponent } from './product-list-page.component';
import { RouterModule } from '@angular/router';
import { ProductsManualService } from '../../core/services/products-manual.service';
import { ProductsManualDbNameToken, ProductsManualStoreNameToken } from '../../core/injectors/products-manual-db.injector';

describe('ProductListPageComponent', () => {
    let component: ProductListPageComponent;
    let fixture: ComponentFixture<ProductListPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterModule, ProductListPageComponent],
            providers: [
                ProductsManualService,
                {
                    provide: ProductsManualDbNameToken,
                    useValue: 'productDB'
                },
                {
                    provide: ProductsManualStoreNameToken,
                    useValue: 'products'
                }
            ]
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
