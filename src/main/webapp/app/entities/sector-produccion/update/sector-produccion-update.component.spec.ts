jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SectorProduccionService } from '../service/sector-produccion.service';
import { ISectorProduccion, SectorProduccion } from '../sector-produccion.model';
import { IFermentos } from 'app/entities/fermentos/fermentos.model';
import { FermentosService } from 'app/entities/fermentos/service/fermentos.service';
import { IRecepcion } from 'app/entities/recepcion/recepcion.model';
import { RecepcionService } from 'app/entities/recepcion/service/recepcion.service';

import { SectorProduccionUpdateComponent } from './sector-produccion-update.component';

describe('Component Tests', () => {
  describe('SectorProduccion Management Update Component', () => {
    let comp: SectorProduccionUpdateComponent;
    let fixture: ComponentFixture<SectorProduccionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let sectorProduccionService: SectorProduccionService;
    let fermentosService: FermentosService;
    let recepcionService: RecepcionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SectorProduccionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SectorProduccionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SectorProduccionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      sectorProduccionService = TestBed.inject(SectorProduccionService);
      fermentosService = TestBed.inject(FermentosService);
      recepcionService = TestBed.inject(RecepcionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Fermentos query and add missing value', () => {
        const sectorProduccion: ISectorProduccion = { id: 456 };
        const fermentos: IFermentos = { id: 54999 };
        sectorProduccion.fermentos = fermentos;

        const fermentosCollection: IFermentos[] = [{ id: 69831 }];
        spyOn(fermentosService, 'query').and.returnValue(of(new HttpResponse({ body: fermentosCollection })));
        const additionalFermentos = [fermentos];
        const expectedCollection: IFermentos[] = [...additionalFermentos, ...fermentosCollection];
        spyOn(fermentosService, 'addFermentosToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ sectorProduccion });
        comp.ngOnInit();

        expect(fermentosService.query).toHaveBeenCalled();
        expect(fermentosService.addFermentosToCollectionIfMissing).toHaveBeenCalledWith(fermentosCollection, ...additionalFermentos);
        expect(comp.fermentosSharedCollection).toEqual(expectedCollection);
      });

      it('Should call Recepcion query and add missing value', () => {
        const sectorProduccion: ISectorProduccion = { id: 456 };
        const recepcion: IRecepcion = { id: 45548 };
        sectorProduccion.recepcion = recepcion;

        const recepcionCollection: IRecepcion[] = [{ id: 20626 }];
        spyOn(recepcionService, 'query').and.returnValue(of(new HttpResponse({ body: recepcionCollection })));
        const additionalRecepcions = [recepcion];
        const expectedCollection: IRecepcion[] = [...additionalRecepcions, ...recepcionCollection];
        spyOn(recepcionService, 'addRecepcionToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ sectorProduccion });
        comp.ngOnInit();

        expect(recepcionService.query).toHaveBeenCalled();
        expect(recepcionService.addRecepcionToCollectionIfMissing).toHaveBeenCalledWith(recepcionCollection, ...additionalRecepcions);
        expect(comp.recepcionsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const sectorProduccion: ISectorProduccion = { id: 456 };
        const fermentos: IFermentos = { id: 50223 };
        sectorProduccion.fermentos = fermentos;
        const recepcion: IRecepcion = { id: 68839 };
        sectorProduccion.recepcion = recepcion;

        activatedRoute.data = of({ sectorProduccion });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(sectorProduccion));
        expect(comp.fermentosSharedCollection).toContain(fermentos);
        expect(comp.recepcionsSharedCollection).toContain(recepcion);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const sectorProduccion = { id: 123 };
        spyOn(sectorProduccionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ sectorProduccion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: sectorProduccion }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(sectorProduccionService.update).toHaveBeenCalledWith(sectorProduccion);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const sectorProduccion = new SectorProduccion();
        spyOn(sectorProduccionService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ sectorProduccion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: sectorProduccion }));
        saveSubject.complete();

        // THEN
        expect(sectorProduccionService.create).toHaveBeenCalledWith(sectorProduccion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const sectorProduccion = { id: 123 };
        spyOn(sectorProduccionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ sectorProduccion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(sectorProduccionService.update).toHaveBeenCalledWith(sectorProduccion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackFermentosById', () => {
        it('Should return tracked Fermentos primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackFermentosById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackRecepcionById', () => {
        it('Should return tracked Recepcion primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackRecepcionById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
