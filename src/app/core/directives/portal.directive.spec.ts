import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { PortalDirective } from './portal.directive';

@Component({
    selector: 'xc-stub-component',
    template: `
        <ng-template *cdkPortal="'body'">
            <p>Content projected by PortalDirective</p>
        </ng-template>
    `,
    standalone: true,
    imports: [PortalModule, PortalDirective, CdkPortal]
})
export class StubComponent {
    @ViewChild(PortalDirective, {static: true}) portalDirective!: PortalDirective;
}

describe('PortalDirective', () => {
    let fixture: ComponentFixture<StubComponent>;
    let directive: PortalDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PortalDirective, CdkPortal, StubComponent]
        });

        fixture = TestBed.createComponent(StubComponent);
        directive = fixture.componentInstance.portalDirective;

        fixture.detectChanges();
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
