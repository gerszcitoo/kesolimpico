import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISectorProduccion } from '../sector-produccion.model';

@Component({
  selector: 'jhi-sector-produccion-detail',
  templateUrl: './sector-produccion-detail.component.html',
})
export class SectorProduccionDetailComponent implements OnInit {
  sectorProduccion: ISectorProduccion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sectorProduccion }) => {
      this.sectorProduccion = sectorProduccion;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
