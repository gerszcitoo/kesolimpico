import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ISaladero, Saladero } from '../saladero.model';
import { SaladeroService } from '../service/saladero.service';

@Component({
  selector: 'jhi-saladero-update',
  templateUrl: './saladero-update.component.html',
})
export class SaladeroUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    fechaEnt: [],
    fechaSal: [],
    peso: [],
  });

  constructor(protected saladeroService: SaladeroService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ saladero }) => {
      if (saladero.id === undefined) {
        const today = dayjs().startOf('day');
        saladero.fechaEnt = today;
        saladero.fechaSal = today;
      }

      this.updateForm(saladero);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const saladero = this.createFromForm();
    if (saladero.id !== undefined) {
      this.subscribeToSaveResponse(this.saladeroService.update(saladero));
    } else {
      this.subscribeToSaveResponse(this.saladeroService.create(saladero));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISaladero>>): void {
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

  protected updateForm(saladero: ISaladero): void {
    this.editForm.patchValue({
      id: saladero.id,
      fechaEnt: saladero.fechaEnt ? saladero.fechaEnt.format(DATE_TIME_FORMAT) : null,
      fechaSal: saladero.fechaSal ? saladero.fechaSal.format(DATE_TIME_FORMAT) : null,
      peso: saladero.peso,
    });
  }

  protected createFromForm(): ISaladero {
    return {
      ...new Saladero(),
      id: this.editForm.get(['id'])!.value,
      fechaEnt: this.editForm.get(['fechaEnt'])!.value ? dayjs(this.editForm.get(['fechaEnt'])!.value, DATE_TIME_FORMAT) : undefined,
      fechaSal: this.editForm.get(['fechaSal'])!.value ? dayjs(this.editForm.get(['fechaSal'])!.value, DATE_TIME_FORMAT) : undefined,
      peso: this.editForm.get(['peso'])!.value,
    };
  }
}
