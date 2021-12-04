import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecepcion } from '../recepcion.model';

@Component({
  selector: 'jhi-recepcion-detail',
  templateUrl: './recepcion-detail.component.html',
})
export class RecepcionDetailComponent implements OnInit {
  recepcion: IRecepcion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recepcion }) => {
      this.recepcion = recepcion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
