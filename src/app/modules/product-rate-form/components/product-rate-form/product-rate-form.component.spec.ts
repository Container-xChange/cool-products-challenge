import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductRateFormComponent } from './product-rate-form.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productItemsMock } from '@xc/test/mocks/product-list.mock';

describe('ProductRateFormComponent', () => {
    let component: ProductRateFormComponent;
    let fixture: ComponentFixture<ProductRateFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductRateFormComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductRateFormComponent);
        component = fixture.componentInstance;
        component.product = {
            ...productItemsMock()[0],
            rating: {
                rate: 5,
                count: 4
            }
        };
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should instantiate rating form', () => {
        fixture.detectChanges();
        expect(component.rating).toBeInstanceOf(FormControl);
    });

    describe('Rating Form Validation Failed', () => {
        const testCases: [string, string][] = [
            ['', 'required'],
            ['0', 'min'],
            ['6', 'max'],
            ['one', 'pattern']
        ];

        for (const [value, error] of testCases) {
            it(`should not submit rating if the rate form is invalid with "${error}"`, waitForAsync(async () => {
                const updateSpy = jest.spyOn(component.productChange, 'emit');
                fixture.detectChanges();
                await fixture.whenStable();

                component.rating.setValue(value, { emitEvent: true });
                component.rating.updateValueAndValidity();
                component.rate();
                expect(updateSpy).not.toHaveBeenCalled();
                expect(component.rating.errors).toBeTruthy();
                expect(component.rating.errors![error]).toBeTruthy();
            }));
        }
    });

    it('should update the rating with the submitted value', waitForAsync(async () => {
        const updateSpy = jest.spyOn(component.productChange, 'emit');
        fixture.detectChanges();
        await fixture.whenStable();

        component.rating.setValue('4');
        component.rate();

        await fixture.whenStable();
        expect(updateSpy).toHaveBeenCalledWith(expect.objectContaining({ rating: { rate: 4.8, count: 5 } }));
    }));

    it('should reset the rating form after submitting the rate', waitForAsync(async () => {
        fixture.detectChanges();
        await fixture.whenStable();

        component.rating.setValue('5');
        component.rating.updateValueAndValidity();
        component.rate();

        await fixture.whenStable();
        expect(component.rating.value).toBe('');
        expect(component.rating.pristine).toBe(true);
    }));
});
