import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductListSettingsComponent } from './product-list-settings.component';
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    template: `
        <xc-product-list-settings [(ngModel)]="count"
                                  [minCount]="minCount"
                                  [maxCount]="maxCount"
                                  [disabled]="disabled"
        ></xc-product-list-settings>
    `
})
class ProductListSettingsTestComponent {
    @ViewChild(ProductListSettingsComponent) underTest!: ProductListSettingsComponent;
    @Input() count = 10;
    @Input() minCount = 1;
    @Input() maxCount = 100;
    @Input() disabled = false;
}

describe('ProductListSettingsComponent', () => {
    let component: ProductListSettingsTestComponent;
    let fixture: ComponentFixture<ProductListSettingsTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductListSettingsTestComponent],
            imports: [FormsModule, ProductListSettingsComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ProductListSettingsTestComponent);
        component = fixture.componentInstance;
    });

    function changeValue(value: string): void {
        const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('input[type="number"]');
        inputEl.value = value;
        inputEl.dispatchEvent(new Event('change'));

        fixture.detectChanges();
    }

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
        expect(component.underTest).toBeTruthy();
    });

    it('should update the count value on input range change', waitForAsync(async () => {
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.count).toBe(10);

        const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('input[type="range"]');
        inputEl.value = '5';
        inputEl.dispatchEvent(new Event('change'));

        fixture.detectChanges();
        expect(component.count).toBe(5);
    }));

    it('should update the count value on input number change', waitForAsync(async () => {
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.count).toBe(10);

        const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('input[type="number"]');
        inputEl.value = '5';
        inputEl.dispatchEvent(new Event('change'));

        fixture.detectChanges();
        expect(component.count).toBe(5);
    }));

    it('should limit to the minimum count value', waitForAsync(async () => {
        component.minCount = 1;
        fixture.detectChanges();
        await fixture.whenStable();

        changeValue('0');
        expect(component.count).toBe(1);
    }));

    it('should limit to the maximum count value', waitForAsync(async () => {
        component.maxCount = 10;
        fixture.detectChanges();
        await fixture.whenStable();

        changeValue('11');
        expect(component.count).toBe(10);
    }));

    it('should reset to the initial count value', waitForAsync(async () => {
        component.count = 5;
        fixture.detectChanges();
        await fixture.whenStable();

        changeValue('10');
        expect(component.count).toBe(10);

        component.underTest.reset();
        expect(component.count).toBe(5);
    }));

    it('should disable both range and number inputs', waitForAsync(async () => {
        component.disabled = true;
        fixture.detectChanges();
        await fixture.whenStable();

        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('input[type="range"]').disabled).toBe(true);
        expect(fixture.nativeElement.querySelector('input[type="number"]').disabled).toBe(true);
    }));

    it('should mark as touched after updating the value', waitForAsync(async () => {
        fixture.detectChanges();
        expect(component.underTest.touched).toBe(false);

        await fixture.whenStable();
        changeValue('11');
        expect(component.underTest.touched).toBe(true);
    }));
});
