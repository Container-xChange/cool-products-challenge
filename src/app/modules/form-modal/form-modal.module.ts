import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModalUiService } from '@xc/modules/form-modal/services/form-modal-ui.service';

@NgModule({
    imports: [CommonModule],
    providers: [FormModalUiService]
})
export class FormModalModule {
}