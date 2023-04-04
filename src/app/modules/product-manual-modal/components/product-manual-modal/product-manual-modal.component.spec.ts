import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductManualModalComponent } from './product-manual-modal.component';
import { ProductManualFormModule } from '@xc/modules/product-manual-form/product-manual-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productManualFormEmptyValueMock, productManualFormValueMock, productManualModalFormValueMock } from '@xc/test/mocks/product-manual-form.mock';
import { ProductManualForm, ProductManualFormModel } from '@xc/core/interfaces/product-manual-form.interface';

describe('ProductManualModalComponent', () => {
    let component: ProductManualModalComponent;
    let fixture: ComponentFixture<ProductManualModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductManualModalComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                ProductManualFormModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductManualModalComponent);
        component = fixture.componentInstance;

        component.send = jest.fn();
        component.close = jest.fn();
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should initialize the form on ngOnInit', () => {
        fixture.detectChanges();
        expect(component.form).toBeDefined();
    });

    it('should create a product form', () => {
        fixture.detectChanges();

        const productForm = component.form.controls.product;
        expect(productForm.controls.title).toBeDefined();
        expect(productForm.controls.category).toBeDefined();
        expect(productForm.controls.description).toBeDefined();
        expect(productForm.controls.imageUrl).toBeDefined();
        expect(productForm.controls.rating).toBeDefined();
        expect(productForm.controls.ratingCount).toBeDefined();
        expect(productForm.controls.price).toBeDefined();
    });

    it('should call send with the form data on submit', () => {
        const expected = productManualFormValueMock();

        fixture.detectChanges();
        component.form.setValue(productManualModalFormValueMock(productManualFormValueMock()));
        component.submit();
        expect(component.send).toHaveBeenCalledWith(expected);
    });

    describe('Repeat state', () => {
        it('should not close and reset the product form after submitting when the repeat state is active', () => {
            fixture.detectChanges();

            component.form.setValue(productManualModalFormValueMock(productManualFormValueMock(), true));
            component.submit();
            expect(component.close).not.toHaveBeenCalled();
            expect(component.form.controls.product.getRawValue()).toEqual(productManualFormEmptyValueMock());
        });

        it('should close when the repeat state is inactive', () => {
            fixture.detectChanges();

            component.form.setValue(productManualModalFormValueMock(productManualFormValueMock(), false));
            component.submit();
            expect(component.close).toHaveBeenCalled();
        });
    });

    describe('Form Validation Failed', () => {
        const testCases: [Partial<ProductManualFormModel>, { [key in keyof ProductManualForm]?: string }][] = [
            [{ title: '' }, { title: 'required' }],
            [{ title: Array(101).fill(' ').join('') }, { title: 'maxlength' }],
            [{ category: '' }, { category: 'required' }],
            [{ category: Array(51).fill(' ').join('') }, { category: 'maxlength' }],
            [{ description: '' }, { description: 'required' }],
            [{ description: Array(501).fill(' ').join('') }, { description: 'maxlength' }],
            [{ imageUrl: '' }, { imageUrl: 'required' }],
            [{ imageUrl: Array(501).fill(' ').join('') }, { imageUrl: 'maxlength' }],
            [{ imageUrl: 'testing' }, { imageUrl: 'pattern' }],
            [{ imageUrl: 'https://testing.com' }, { imageUrl: 'pattern' }],
            [{ rating: '' }, { rating: 'required' }],
            [{ rating: '0' }, { rating: 'min' }],
            [{ rating: '6' }, { rating: 'max' }],
            [{ rating: 'one' }, { rating: 'pattern' }],
            [{ ratingCount: '' }, { ratingCount: 'required' }],
            [{ ratingCount: '0' }, { ratingCount: 'min' }],
            [{ ratingCount: 'one' }, { ratingCount: 'pattern' }],
            [{ price: '' }, { price: 'required' }],
            [{ price: '0' }, { price: 'min' }],
            [{ price: 'one' }, { price: 'pattern' }]
        ];

        for (const [changes, errors] of testCases) {
            it(`should not call send method if the form is invalid with "${Object.values(errors)}" on fields "${Object.keys(changes)}"`, waitForAsync(async () => {
                fixture.detectChanges();
                await fixture.whenStable();

                component.form.controls.product.setValue(Object.assign(productManualFormValueMock(), changes), { emitEvent: true });
                component.form.updateValueAndValidity();
                component.submit();
                expect(component.send).not.toHaveBeenCalled();

                for (const field in errors) {
                    const controlKey = field as keyof ProductManualForm;
                    expect(component.form.controls.product.controls[controlKey].errors).toBeTruthy();
                    const errorKey = errors[controlKey] as string;
                    expect(Object.keys(component.form.controls.product.controls[controlKey].errors!)).toContain(errorKey);
                }
            }));
        }
    });
});
