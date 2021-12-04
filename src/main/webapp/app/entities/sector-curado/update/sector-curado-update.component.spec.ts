jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SectorCuradoService } from '../service/sector-curado.service';
import { ISectorCurado, SectorCurado } from '../sector-curado.model';

import { SectorCuradoUpdateComponent } from './sector-curado-update.component';

describe('Component Tests', () => {
  describe('SectorCurado Management Update Component', () => {
    let comp: SectorCuradoUpdateComponent;
    let fixture: ComponentFixture<SectorCuradoUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let sectorCuradoService: SectorCuradoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SectorCuradoUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SectorCuradoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SectorCuradoUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      sectorCuradoService = TestBed.inject(SectorCuradoService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const sectorCurado: ISectorCurado = { id: 456 };

        activatedRoute.data = of({ sectorCurado });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(sectorCurado));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const sectorCurado = { id: 123 };
        spyOn(sectorCuradoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ sectorCurado });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: sectorCurado }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(sectorCuradoService.update).toHaveBeenCalledWith(sectorCurado);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const sectorCurado = new SectorCurado();
        spyOn(sectorCuradoService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ sectorCurado });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: sectorCurado }));
        saveSubject.complete();

        // THEN
        expect(sectorCuradoService.create).toHaveBeenCalledWith(sectorCurado);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const sectorCurado = { id: 123 };
        spyOn(sectorCuradoService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ sectorCurado });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(sectorCuradoService.update).toHaveBeenCalledWith(sectorCurado);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
