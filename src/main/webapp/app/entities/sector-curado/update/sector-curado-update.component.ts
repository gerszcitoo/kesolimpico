import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import * as dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';

import { ISectorCurado, SectorCurado } from '../sector-curado.model';
import { SectorCuradoService } from '../service/sector-curado.service';

@Component({
  selector: 'jhi-sector-curado-update',
  templateUrl: './sector-curado-update.component.html',
})
export class SectorCuradoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    fechaEnt: [],
    fechaSal: [],
    temperatura: [],
    calidad: [null, [Validators.min(1), Validators.max(10)]],
    humedad: [],
    co2: [],
    pesoEnt: [],
    pesoSal: [],
  });

  constructor(protected sectorCuradoService: SectorCuradoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sectorCurado }) => {
      if (sectorCurado.id === undefined) {
        const today = dayjs().startOf('day');
        sectorCurado.fechaEnt = today;
        sectorCurado.fechaSal = today;
      }

      this.updateForm(sectorCurado);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sectorCurado = this.createFromForm();
    if (sectorCurado.id !== undefined) {
      this.subscribeToSaveResponse(this.sectorCuradoService.update(sectorCurado));
    } else {
      this.subscribeToSaveResponse(this.sectorCuradoService.create(sectorCurado));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISectorCurado>>): void {
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

  protected updateForm(sectorCurado: ISectorCurado): void {
    this.editForm.patchValue({
      id: sectorCurado.id,
      fechaEnt: sectorCurado.fechaEnt ? sectorCurado.fechaEnt.format(DATE_TIME_FORMAT) : null,
      fechaSal: sectorCurado.fechaSal ? sectorCurado.fechaSal.format(DATE_TIME_FORMAT) : null,
      temperatura: sectorCurado.temperatura,
      calidad: sectorCurado.calidad,
      humedad: sectorCurado.humedad,
      co2: sectorCurado.co2,
      pesoEnt: sectorCurado.pesoEnt,
      pesoSal: sectorCurado.pesoSal,
    });
  }

  protected createFromForm(): ISectorCurado {
    return {
      ...new SectorCurado(),
      id: this.editForm.get(['id'])!.value,
      fechaEnt: this.editForm.get(['fechaEnt'])!.value ? dayjs(this.editForm.get(['fechaEnt'])!.value, DATE_TIME_FORMAT) : undefined,
      fechaSal: this.editForm.get(['fechaSal'])!.value ? dayjs(this.editForm.get(['fechaSal'])!.value, DATE_TIME_FORMAT) : undefined,
      temperatura: this.editForm.get(['temperatura'])!.value,
      calidad: this.editForm.get(['calidad'])!.value,
      humedad: this.editForm.get(['humedad'])!.value,
      co2: this.editForm.get(['co2'])!.value,
      pesoEnt: this.editForm.get(['pesoEnt'])!.value,
      pesoSal: this.editForm.get(['pesoSal'])!.value,
    };
  }
}
