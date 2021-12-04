import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICisterna } from '../cisterna.model';

@Component({
  selector: 'jhi-cisterna-detail',
  templateUrl: './cisterna-detail.component.html',
})
export class CisternaDetailComponent implements OnInit {
  cisterna: ICisterna | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cisterna }) => {
      this.cisterna = cisterna;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
