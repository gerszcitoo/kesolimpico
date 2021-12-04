import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { IAlmacen, Almacen } from '../almacen.model';
import { AlmacenService } from '../service/almacen.service';

@Component({
  selector: 'jhi-almacen-update',
  templateUrl: './almacen-update.component.html',
})
export class AlmacenUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    estado: [null, [Validators.min(1), Validators.max(10)]],
    fechaEnt: [],
    fechaSal: [],
  });

  constructor(protected almacenService: AlmacenService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ almacen }) => {
      if (almacen.id === undefined) {
        const today = dayjs().startOf('day');
        almacen.fechaEnt = today;
        almacen.fechaSal = today;
      }

      this.updateForm(almacen);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const almacen = this.createFromForm();
    if (almacen.id !== undefined) {
      this.subscribeToSaveResponse(this.almacenService.update(almacen));
    } else {
      this.subscribeToSaveResponse(this.almacenService.create(almacen));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlmacen>>): void {
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

  protected updateForm(almacen: IAlmacen): void {
    this.editForm.patchValue({
      id: almacen.id,
      estado: almacen.estado,
      fechaEnt: almacen.fechaEnt ? almacen.fechaEnt.format(DATE_TIME_FORMAT) : null,
      fechaSal: almacen.fechaSal ? almacen.fechaSal.format(DATE_TIME_FORMAT) : null,
    });
  }

  protected createFromForm(): IAlmacen {
    return {
      ...new Almacen(),
      id: this.editForm.get(['id'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      fechaEnt: this.editForm.get(['fechaEnt'])!.value ? dayjs(this.editForm.get(['fechaEnt'])!.value, DATE_TIME_FORMAT) : undefined,
      fechaSal: this.editForm.get(['fechaSal'])!.value ? dayjs(this.editForm.get(['fechaSal'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }
}
