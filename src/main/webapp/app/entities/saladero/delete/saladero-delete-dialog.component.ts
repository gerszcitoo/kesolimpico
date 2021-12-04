import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISaladero } from '../saladero.model';
import { SaladeroService } from '../service/saladero.service';

@Component({
  templateUrl: './saladero-delete-dialog.component.html',
})
export class SaladeroDeleteDialogComponent {
  saladero?: ISaladero;

  constructor(protected saladeroService: SaladeroService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.saladeroService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
