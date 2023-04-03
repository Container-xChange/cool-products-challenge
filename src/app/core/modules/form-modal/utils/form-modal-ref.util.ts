import { Observable, Subject, takeUntil } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { IOverlayFormRef, OverlayFormInstance } from '../../../interfaces/overlay.interface';

export class FormModalRef<T> implements IOverlayFormRef<T>, OverlayFormInstance<T> {

    get send$(): Observable<T> {
        return this.sendSubject.pipe(takeUntil(this.close$));
    }

    get close$(): Observable<void> {
        return this.overlayRef.detachments();
    }

    private readonly sendSubject: Subject<T> = new Subject<T>();

    constructor(private overlayRef: OverlayRef) {
    }

    send(value: T): void {
        this.sendSubject.next(value);
    }

    close(): void {
        this.overlayRef.dispose();
    }
}
