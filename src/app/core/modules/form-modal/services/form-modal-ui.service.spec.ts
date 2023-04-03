import { TestBed } from '@angular/core/testing';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { FormModalUiService } from './form-modal-ui.service';
import { Component, Input } from '@angular/core';
import { first, Subject } from 'rxjs';
import { OverlayFormInstance } from '../../../interfaces/overlay.interface';
import { ServiceMock } from '../../../../test/utils/service-mock.util';
import { FormModalRef } from '../utils/form-modal-ref.util';

@Component({
    template: ''
})
class TestComponent implements OverlayFormInstance<boolean> {
    @Input() send!: (_: boolean) => void;
    @Input() close!: () => void;
}

describe('FormModalUiService', () => {
    let service: FormModalUiService;
    let overlay: Overlay;
    let overlayCreateSpy: jest.SpyInstance;
    let overlayRef: ServiceMock<OverlayRef>;
    let instance: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Overlay,
                FormModalUiService
            ]
        });

        service = TestBed.inject(FormModalUiService);
        overlay = TestBed.inject(Overlay);

        const detachments$ = new Subject();
        instance = new TestComponent();
        overlayRef = {
            attach: jest.fn(() => ({ instance })),
            dispose: jest.fn(() => detachments$.next(undefined)),
            detachments: jest.fn(() => detachments$)
        } as unknown as ServiceMock<OverlayRef>;
        overlayCreateSpy = jest.spyOn(overlay, 'create').mockReturnValue(overlayRef as unknown as OverlayRef);
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should open a modal', () => {
        const dialogRef = service.open(TestComponent);
        expect(overlayCreateSpy).toHaveBeenCalledTimes(1);
        expect(overlayCreateSpy).toHaveBeenCalledWith({
            positionStrategy: expect.anything(),
            hasBackdrop: true,
            scrollStrategy: expect.anything()
        });
        expect(dialogRef).toBeInstanceOf(FormModalRef);
        expect(overlayRef.attach).toHaveBeenCalledTimes(1);
        const componentInstance = overlayRef.attach.mock.results[0].value.instance;
        expect(componentInstance.send).toBe(instance.send);
        expect(componentInstance.close).toBe(instance.close);
        expect(service['dialogRef']).toBe(dialogRef);
    });

    it('should close an existing dialog', () => {
        const dialogRef = { close: jest.fn() } as any;
        service['dialogRef'] = dialogRef;
        service.open(TestComponent);
        expect(dialogRef.close).toHaveBeenCalledTimes(1);
        expect(service['dialogRef']).not.toBe(dialogRef);
    });

    it('should emit a close event when the overlay is closed', (done) => {
        const dialogRef = service.open(TestComponent);

        expect(instance.close).toBeDefined();

        dialogRef.close$.pipe(first())
            .subscribe({ next: done, error: () => done.fail('should not enter here') });

        instance.close();
    });

    it('should send overlay data', (done) => {
        const dialogRef = service.open(TestComponent);
        const expected = true;

        expect(instance.send).toBeDefined();

        dialogRef.send$.pipe(first())
            .subscribe({
                next: (value: boolean) => {
                    expect(value).toBe(expected);
                    done();
                }, error: () => done.fail('should not enter here')
            });

        instance.send(expected);
    });

    it('should dispose the overlay when the dialog is closed', () => {
        const dialogRef = service.open(TestComponent);
        dialogRef.close();
        expect(overlayRef.dispose).toHaveBeenCalledTimes(1);
    });
});
