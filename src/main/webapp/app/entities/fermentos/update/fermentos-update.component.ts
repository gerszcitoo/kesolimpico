import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IFermentos, Fermentos } from '../fermentos.model';
import { FermentosService } from '../service/fermentos.service';

@Component({
  selector: 'jhi-fermentos-update',
  templateUrl: './fermentos-update.component.html',
})
export class FermentosUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    fecha: [],
    peso: [],
    calidad: [null, [Validators.min(1), Validators.max(10)]],
    detalle: [],
    tipoQueso: [],
  });

  constructor(protected fermentosService: FermentosService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fermentos }) => {
      if (fermentos.id === undefined) {
        const today = dayjs().startOf('day');
        fermentos.fecha = today;
      }

      this.updateForm(fermentos);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fermentos = this.createFromForm();
    if (fermentos.id !== undefined) {
      this.subscribeToSaveResponse(this.fermentosService.update(fermentos));
    } else {
      this.subscribeToSaveResponse(this.fermentosService.create(fermentos));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFermentos>>): void {
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

  protected updateForm(fermentos: IFermentos): void {
    this.editForm.patchValue({
      id: fermentos.id,
      fecha: fermentos.fecha ? fermentos.fecha.format(DATE_TIME_FORMAT) : null,
      peso: fermentos.peso,
      calidad: fermentos.calidad,
      detalle: fermentos.detalle,
      tipoQueso: fermentos.tipoQueso,
    });
  }

  protected createFromForm(): IFermentos {
    return {
      ...new Fermentos(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      peso: this.editForm.get(['peso'])!.value,
      calidad: this.editForm.get(['calidad'])!.value,
      detalle: this.editForm.get(['detalle'])!.value,
      tipoQueso: this.editForm.get(['tipoQueso'])!.value,
    };
  }
}
