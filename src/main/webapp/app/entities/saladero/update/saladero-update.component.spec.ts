jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SaladeroService } from '../service/saladero.service';
import { ISaladero, Saladero } from '../saladero.model';

import { SaladeroUpdateComponent } from './saladero-update.component';

describe('Component Tests', () => {
  describe('Saladero Management Update Component', () => {
    let comp: SaladeroUpdateComponent;
    let fixture: ComponentFixture<SaladeroUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let saladeroService: SaladeroService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SaladeroUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SaladeroUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SaladeroUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      saladeroService = TestBed.inject(SaladeroService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const saladero: ISaladero = { id: 456 };

        activatedRoute.data = of({ saladero });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(saladero));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const saladero = { id: 123 };
        spyOn(saladeroService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ saladero });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: saladero }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(saladeroService.update).toHaveBeenCalledWith(saladero);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const saladero = new Saladero();
        spyOn(saladeroService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ saladero });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: saladero }));
        saveSubject.complete();

        // THEN
        expect(saladeroService.create).toHaveBeenCalledWith(saladero);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const saladero = { id: 123 };
        spyOn(saladeroService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ saladero });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(saladeroService.update).toHaveBeenCalledWith(saladero);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
