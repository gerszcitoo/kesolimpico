import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICisterna } from '../cisterna.model';
import { CisternaService } from '../service/cisterna.service';

@Component({
  templateUrl: './cisterna-delete-dialog.component.html',
})
export class CisternaDeleteDialogComponent {
  cisterna?: ICisterna;

  constructor(protected cisternaService: CisternaService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cisternaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
