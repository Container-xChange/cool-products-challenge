import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const STORAGE_KEY = 'xc-allow-rating';

@Injectable({
    providedIn: 'root'
})
export class ProductsRatePermissionService {

    get allow$(): Observable<boolean> {
        return this.allowSubject.asObservable();
    }

    private readonly allowSubject: Subject<boolean> = new BehaviorSubject(false);

    constructor() {
        this.load();
    }

    update(allow: boolean): void {
        if (allow) {
            sessionStorage.setItem(STORAGE_KEY, 'true');
        } else {
            sessionStorage.removeItem(STORAGE_KEY);
        }
        this.allowSubject.next(allow);
    }

    private load(): void {
        this.allowSubject.next(sessionStorage.getItem(STORAGE_KEY) === 'true');
    }
}
