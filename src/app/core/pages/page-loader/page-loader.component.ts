import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'xc-page-loader',
    templateUrl: './page-loader.component.html',
    styleUrls: ['./page-loader.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLoaderComponent {
}
