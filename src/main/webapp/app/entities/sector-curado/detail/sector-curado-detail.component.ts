import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISectorCurado } from '../sector-curado.model';

@Component({
  selector: 'jhi-sector-curado-detail',
  templateUrl: './sector-curado-detail.component.html',
})
export class SectorCuradoDetailComponent implements OnInit {
  sectorCurado: ISectorCurado | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sectorCurado }) => {
      this.sectorCurado = sectorCurado;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
