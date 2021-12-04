import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISectorCurado } from '../sector-curado.model';
import { SectorCuradoService } from '../service/sector-curado.service';

@Component({
  templateUrl: './sector-curado-delete-dialog.component.html',
})
export class SectorCuradoDeleteDialogComponent {
  sectorCurado?: ISectorCurado;

  constructor(protected sectorCuradoService: SectorCuradoService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sectorCuradoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
