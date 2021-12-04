jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AlmacenService } from '../service/almacen.service';
import { IAlmacen, Almacen } from '../almacen.model';

import { AlmacenUpdateComponent } from './almacen-update.component';

describe('Component Tests', () => {
  describe('Almacen Management Update Component', () => {
    let comp: AlmacenUpdateComponent;
    let fixture: ComponentFixture<AlmacenUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let almacenService: AlmacenService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [AlmacenUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(AlmacenUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlmacenUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      almacenService = TestBed.inject(AlmacenService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const almacen: IAlmacen = { id: 456 };

        activatedRoute.data = of({ almacen });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(almacen));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const almacen = { id: 123 };
        spyOn(almacenService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ almacen });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: almacen }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(almacenService.update).toHaveBeenCalledWith(almacen);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const almacen = new Almacen();
        spyOn(almacenService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ almacen });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: almacen }));
        saveSubject.complete();

        // THEN
        expect(almacenService.create).toHaveBeenCalledWith(almacen);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const almacen = { id: 123 };
        spyOn(almacenService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ almacen });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(almacenService.update).toHaveBeenCalledWith(almacen);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
