import { Observable } from 'rxjs';

export interface OverlayInstance {
    close: () => void;
}

export interface OverlayFormInstance<T> extends OverlayInstance {
    send: (value: T) => void;
}

export interface IOverlayRef {
    close$: Observable<void>;
}

export interface IOverlayFormRef<T> extends IOverlayRef {
    send$: Observable<T>;
}
