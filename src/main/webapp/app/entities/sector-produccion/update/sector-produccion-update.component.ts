import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ISectorProduccion, SectorProduccion } from '../sector-produccion.model';
import { SectorProduccionService } from '../service/sector-produccion.service';
import { IFermentos } from 'app/entities/fermentos/fermentos.model';
import { FermentosService } from 'app/entities/fermentos/service/fermentos.service';
import { IRecepcion } from 'app/entities/recepcion/recepcion.model';
import { RecepcionService } from 'app/entities/recepcion/service/recepcion.service';

@Component({
  selector: 'jhi-sector-produccion-update',
  templateUrl: './sector-produccion-update.component.html',
})
export class SectorProduccionUpdateComponent implements OnInit {
  isSaving = false;

  fermentosSharedCollection: IFermentos[] = [];
  recepcionsSharedCollection: IRecepcion[] = [];

  editForm = this.fb.group({
    id: [],
    peso: [],
    fermentos: [],
    recepcion: [],
  });

  constructor(
    protected sectorProduccionService: SectorProduccionService,
    protected fermentosService: FermentosService,
    protected recepcionService: RecepcionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sectorProduccion }) => {
      this.updateForm(sectorProduccion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sectorProduccion = this.createFromForm();
    if (sectorProduccion.id !== undefined) {
      this.subscribeToSaveResponse(this.sectorProduccionService.update(sectorProduccion));
    } else {
      this.subscribeToSaveResponse(this.sectorProduccionService.create(sectorProduccion));
    }
  }

  trackFermentosById(index: number, item: IFermentos): number {
    return item.id!;
  }

  trackRecepcionById(index: number, item: IRecepcion): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISectorProduccion>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(sectorProduccion: ISectorProduccion): void {
    this.editForm.patchValue({
      id: sectorProduccion.id,
      peso: sectorProduccion.peso,
      fermentos: sectorProduccion.fermentos,
      recepcion: sectorProduccion.recepcion,
    });

    this.fermentosSharedCollection = this.fermentosService.addFermentosToCollectionIfMissing(
      this.fermentosSharedCollection,
      sectorProduccion.fermentos
    );
    this.recepcionsSharedCollection = this.recepcionService.addRecepcionToCollectionIfMissing(
      this.recepcionsSharedCollection,
      sectorProduccion.recepcion
    );
  }

  protected loadRelationshipsOptions(): void {
    this.fermentosService
      .query()
      .pipe(map((res: HttpResponse<IFermentos[]>) => res.body ?? []))
      .pipe(
        map((fermentos: IFermentos[]) =>
          this.fermentosService.addFermentosToCollectionIfMissing(fermentos, this.editForm.get('fermentos')!.value)
        )
      )
      .subscribe((fermentos: IFermentos[]) => (this.fermentosSharedCollection = fermentos));

    this.recepcionService
      .query()
      .pipe(map((res: HttpResponse<IRecepcion[]>) => res.body ?? []))
      .pipe(
        map((recepcions: IRecepcion[]) =>
          this.recepcionService.addRecepcionToCollectionIfMissing(recepcions, this.editForm.get('recepcion')!.value)
        )
      )
      .subscribe((recepcions: IRecepcion[]) => (this.recepcionsSharedCollection = recepcions));
  }

  protected createFromForm(): ISectorProduccion {
    return {
      ...new SectorProduccion(),
      id: this.editForm.get(['id'])!.value,
      peso: this.editForm.get(['peso'])!.value,
      fermentos: this.editForm.get(['fermentos'])!.value,
      recepcion: this.editForm.get(['recepcion'])!.value,
    };
  }
}
