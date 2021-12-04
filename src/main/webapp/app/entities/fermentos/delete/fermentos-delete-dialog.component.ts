import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFermentos } from '../fermentos.model';
import { FermentosService } from '../service/fermentos.service';

@Component({
  templateUrl: './fermentos-delete-dialog.component.html',
})
export class FermentosDeleteDialogComponent {
  fermentos?: IFermentos;

  constructor(protected fermentosService: FermentosService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fermentosService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
