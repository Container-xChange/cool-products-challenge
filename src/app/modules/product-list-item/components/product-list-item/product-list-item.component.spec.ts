import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListItemComponent } from './product-list-item.component';
import { productItemsMock } from '@xc/test/mocks/product-list.mock';

describe('ProductListItemComponent', () => {
    let component: ProductListItemComponent;
    let fixture: ComponentFixture<ProductListItemComponent>;

    const product = Object.freeze(productItemsMock()[0]);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductListItemComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductListItemComponent);
        component = fixture.componentInstance;
       component.product = product;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should display the product information', () => {
        fixture.detectChanges();

        const nativeElement: HTMLElement = fixture.nativeElement;
        expect(nativeElement.querySelector('.product-item__title')?.textContent).toBe(product.title);
        expect(nativeElement.querySelector('.product-item__subtitle')?.textContent).toBe(product.category);
        expect(nativeElement.querySelector('.product-item__description')?.textContent).toBe(product.description);
        expect(nativeElement.querySelector('.product-item__rating__rate')?.textContent).toBe(product.rating.rate.toString());
        expect(nativeElement.querySelector('.product-item__rating__count')?.textContent).toBe(`(${product.rating.count})`);
        expect(nativeElement.querySelector('.product-item__price')?.textContent).toBe(`€${product.price.toFixed(2)}`);
    });
});
