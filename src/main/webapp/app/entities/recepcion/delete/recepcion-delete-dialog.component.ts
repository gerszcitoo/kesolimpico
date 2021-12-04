import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRecepcion } from '../recepcion.model';
import { RecepcionService } from '../service/recepcion.service';

@Component({
  templateUrl: './recepcion-delete-dialog.component.html',
})
export class RecepcionDeleteDialogComponent {
  recepcion?: IRecepcion;

  constructor(protected recepcionService: RecepcionService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.recepcionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
