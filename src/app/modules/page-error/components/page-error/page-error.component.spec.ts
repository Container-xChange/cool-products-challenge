import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageErrorComponent } from './page-error.component';

describe('PageErrorComponent', () => {
    let component: PageErrorComponent;
    let fixture: ComponentFixture<PageErrorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PageErrorComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PageErrorComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});