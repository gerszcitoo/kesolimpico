import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISaladero } from '../saladero.model';

@Component({
  selector: 'jhi-saladero-detail',
  templateUrl: './saladero-detail.component.html',
})
export class SaladeroDetailComponent implements OnInit {
  saladero: ISaladero | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ saladero }) => {
      this.saladero = saladero;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
