import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICisterna, Cisterna } from '../cisterna.model';
import { CisternaService } from '../service/cisterna.service';

@Component({
  selector: 'jhi-cisterna-update',
  templateUrl: './cisterna-update.component.html',
})
export class CisternaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    estado: [],
    volumen: [],
  });

  constructor(protected cisternaService: CisternaService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cisterna }) => {
      this.updateForm(cisterna);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cisterna = this.createFromForm();
    if (cisterna.id !== undefined) {
      this.subscribeToSaveResponse(this.cisternaService.update(cisterna));
    } else {
      this.subscribeToSaveResponse(this.cisternaService.create(cisterna));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICisterna>>): void {
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

  protected updateForm(cisterna: ICisterna): void {
    this.editForm.patchValue({
      id: cisterna.id,
      estado: cisterna.estado,
      volumen: cisterna.volumen,
    });
  }

  protected createFromForm(): ICisterna {
    return {
      ...new Cisterna(),
      id: this.editForm.get(['id'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      volumen: this.editForm.get(['volumen'])!.value,
    };
  }
}
