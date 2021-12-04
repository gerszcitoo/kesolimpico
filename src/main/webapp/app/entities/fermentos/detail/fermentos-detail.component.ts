import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFermentos } from '../fermentos.model';

@Component({
  selector: 'jhi-fermentos-detail',
  templateUrl: './fermentos-detail.component.html',
})
export class FermentosDetailComponent implements OnInit {
  fermentos: IFermentos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fermentos }) => {
      this.fermentos = fermentos;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
