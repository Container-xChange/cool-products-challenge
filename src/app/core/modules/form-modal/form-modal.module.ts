import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModalUiService } from './services/form-modal-ui.service';

@NgModule({
    imports: [CommonModule],
    providers: [FormModalUiService]
})
export class FormModalModule {
}
