import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManualFormComponent } from './product-manual-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { productManualFormEmptyValueMock } from '@xc/test/mocks/product-manual-form.mock';
import { first } from 'rxjs';

@Component({
    template: `
        <ng-container [formGroup]="form">
            <xc-product-manual-form></xc-product-manual-form>
        </ng-container>
    `
})
class ProductManualFormTestComponent {

    @ViewChild(ProductManualFormComponent, { static: true }) underTest!: ProductManualFormComponent;

    form = this.fb.group({
        product: this.fb.group({
            title: this.fb.control(''),
            category: this.fb.control(''),
            description: this.fb.control(''),
            imageUrl: this.fb.control('', [Validators.maxLength(4)]),
            rating: this.fb.control(''),
            ratingCount: this.fb.control(''),
            price: this.fb.control('')
        })
    });

    constructor(private readonly fb: FormBuilder) {
        this.form.setValue({ product: productManualFormEmptyValueMock() });
    }
}

describe('ProductManualFormComponent', () => {
    let component: ProductManualFormComponent;
    let fixture: ComponentFixture<ProductManualFormTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductManualFormComponent, ProductManualFormTestComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductManualFormTestComponent);
        component = fixture.componentInstance.underTest;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should initialize the form instance', () => {
        fixture.detectChanges();
        expect(component.form).toBeTruthy();
        expect(component.form.getRawValue()).toEqual(productManualFormEmptyValueMock());
    });

    describe('Image Preview', () => {
        it('should have image preview with empty when the value is invalid', () => {
            fixture.detectChanges();
            component.form.controls.imageUrl.setValue('abcd');
            component.imagePreviewUrl$.pipe(first()).subscribe((value) => expect(value).toBeNull());
        });

        it('should have the image preview filled with the image url when the value is valid', () => {
            const expected = 'abc';
            fixture.detectChanges();
            component.form.controls.imageUrl.setValue(expected);
            component.imagePreviewUrl$.pipe(first()).subscribe((value) => expect(value).toBe(expected));
        });
    });

    it('should focus on title input on init', () => {
       fixture.detectChanges();
       expect(fixture.nativeElement.querySelector('#title')).toBe(document.activeElement);
    });
});
