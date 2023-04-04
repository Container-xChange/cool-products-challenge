import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundPageComponent } from './not-found-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotFoundPageComponent', () => {
    let component: NotFoundPageComponent;
    let fixture: ComponentFixture<NotFoundPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotFoundPageComponent],
            imports: [RouterTestingModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NotFoundPageComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
