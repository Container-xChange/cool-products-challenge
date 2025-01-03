import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'xc-product-list-settings',
    templateUrl: './product-list-settings.component.html',
    styleUrls: ['./product-list-settings.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ProductListSettingsComponent),
            multi: true
        }
    ]
})
export class ProductListSettingsComponent implements ControlValueAccessor {

    @Input() minCount!: number;
    @Input() maxCount!: number;

    value!: number;
    initialValue!: number;
    touched = false;
    disabled = false;

    private onChangeFn?: (v: number) => void;
    private onTouchFn?: () => void;

    reset(): void {
        this.writeValue(this.initialValue);
    }

    change(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.writeValue(+input.value);
    }

    registerOnChange(fn: (v: number) => void): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchFn = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(v: number): void {
        this.value = Math.min(Math.max(v, this.minCount), this.maxCount);
        if (!this.touched && this.onTouchFn) {
            this.initialValue = this.value;
            this.onTouchFn();
            this.touched = true;
        }
        this.onChangeFn?.(this.value);
    }
}
