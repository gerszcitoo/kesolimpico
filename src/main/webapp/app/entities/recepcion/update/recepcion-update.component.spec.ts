jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { RecepcionService } from '../service/recepcion.service';
import { IRecepcion, Recepcion } from '../recepcion.model';

import { RecepcionUpdateComponent } from './recepcion-update.component';

describe('Component Tests', () => {
  describe('Recepcion Management Update Component', () => {
    let comp: RecepcionUpdateComponent;
    let fixture: ComponentFixture<RecepcionUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let recepcionService: RecepcionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RecepcionUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(RecepcionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecepcionUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      recepcionService = TestBed.inject(RecepcionService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const recepcion: IRecepcion = { id: 456 };

        activatedRoute.data = of({ recepcion });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(recepcion));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const recepcion = { id: 123 };
        spyOn(recepcionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ recepcion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: recepcion }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(recepcionService.update).toHaveBeenCalledWith(recepcion);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const recepcion = new Recepcion();
        spyOn(recepcionService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ recepcion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: recepcion }));
        saveSubject.complete();

        // THEN
        expect(recepcionService.create).toHaveBeenCalledWith(recepcion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const recepcion = { id: 123 };
        spyOn(recepcionService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ recepcion });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(recepcionService.update).toHaveBeenCalledWith(recepcion);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
