import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISectorProduccion } from '../sector-produccion.model';
import { SectorProduccionService } from '../service/sector-produccion.service';

@Component({
  templateUrl: './sector-produccion-delete-dialog.component.html',
})
export class SectorProduccionDeleteDialogComponent {
  sectorProduccion?: ISectorProduccion;

  constructor(protected sectorProduccionService: SectorProduccionService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sectorProduccionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
