import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Host, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { ProductManualForm } from '@xc/core/interfaces/product-manual-form.interface';
import { map, Observable, shareReplay } from 'rxjs';

@Component({
    selector: 'xc-product-manual-form',
    templateUrl: './product-manual-form.component.html',
    styleUrls: ['./product-manual-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductManualFormComponent implements OnInit, AfterViewInit {

    @ViewChild('titleInput', { static: true }) titleInputElRef!: ElementRef<HTMLInputElement>;

    form!: FormGroup<ProductManualForm>;

    imagePreviewUrl$!: Observable<string | null>;

    constructor(@Host() @SkipSelf() private readonly controlContainer: ControlContainer) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngAfterViewInit(): void {
        this.titleInputElRef.nativeElement.focus();
    }

    private initForm(): void {
        this.form = this.controlContainer.control!.get('product')! as FormGroup<ProductManualForm>;
        this.imagePreviewUrl$ = this.form.controls.imageUrl.valueChanges
            .pipe(map((value) => this.form.controls.imageUrl.valid ? value : null), shareReplay(1));
    }
}
