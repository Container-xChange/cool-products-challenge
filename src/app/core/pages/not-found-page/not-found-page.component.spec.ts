import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundPageComponent } from './not-found-page.component';
import { RouterModule } from '@angular/router';

describe('NotFoundPageComponent', () => {
    let component: NotFoundPageComponent;
    let fixture: ComponentFixture<NotFoundPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NotFoundPageComponent,
                RouterModule.forRoot([
                {
                    path: '',
                    component: NotFoundPageComponent
                }
            ])]
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
