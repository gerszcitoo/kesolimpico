import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IRecepcion, Recepcion } from '../recepcion.model';
import { RecepcionService } from '../service/recepcion.service';

@Component({
  selector: 'jhi-recepcion-update',
  templateUrl: './recepcion-update.component.html',
})
export class RecepcionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    fecha: [],
    calidad: [null, [Validators.min(1), Validators.max(10)]],
    cantidad: [],
    analisis: [],
    tambo: [],
    temperatura: [],
  });

  constructor(protected recepcionService: RecepcionService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recepcion }) => {
      if (recepcion.id === undefined) {
        const today = dayjs().startOf('day');
        recepcion.fecha = today;
      }

      this.updateForm(recepcion);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const recepcion = this.createFromForm();
    if (recepcion.id !== undefined) {
      this.subscribeToSaveResponse(this.recepcionService.update(recepcion));
    } else {
      this.subscribeToSaveResponse(this.recepcionService.create(recepcion));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecepcion>>): void {
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

  protected updateForm(recepcion: IRecepcion): void {
    this.editForm.patchValue({
      id: recepcion.id,
      fecha: recepcion.fecha ? recepcion.fecha.format(DATE_TIME_FORMAT) : null,
      calidad: recepcion.calidad,
      cantidad: recepcion.cantidad,
      analisis: recepcion.analisis,
      tambo: recepcion.tambo,
      temperatura: recepcion.temperatura,
    });
  }

  protected createFromForm(): IRecepcion {
    return {
      ...new Recepcion(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? dayjs(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      calidad: this.editForm.get(['calidad'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      analisis: this.editForm.get(['analisis'])!.value,
      tambo: this.editForm.get(['tambo'])!.value,
      temperatura: this.editForm.get(['temperatura'])!.value,
    };
  }
}
