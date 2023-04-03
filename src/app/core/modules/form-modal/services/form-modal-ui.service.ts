import { Injectable, Injector } from '@angular/core';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayFormInstance, OverlayInstance } from '../../../interfaces/overlay.interface';
import { FormModalRef } from '../utils/form-modal-ref.util';

@Injectable({
    providedIn: 'root'
})
export class FormModalUiService {

    private dialogRef?: OverlayInstance;

    constructor(private readonly injector: Injector, private readonly overlay: Overlay) {
    }

    open<T extends OverlayFormInstance<R>, R = any>(component: ComponentType<T>): FormModalRef<R> {
        const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
        const overlayRef = this.overlay.create({
            positionStrategy,
            hasBackdrop: true,
            scrollStrategy: this.overlay.scrollStrategies.block()
        });
        const dialogRef = new FormModalRef<R>(overlayRef);
        const componentRef = overlayRef.attach(new ComponentPortal(component, null, this.injector));
        componentRef.instance.send = dialogRef.send.bind(dialogRef);
        componentRef.instance.close = dialogRef.close.bind(dialogRef);
        this.dialogRef?.close();
        this.dialogRef = dialogRef;
        return dialogRef;
    }
}
