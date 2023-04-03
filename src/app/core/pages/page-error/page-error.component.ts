import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'xc-page-error',
    templateUrl: './page-error.component.html',
    styleUrls: ['./page-error.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageErrorComponent {
}
