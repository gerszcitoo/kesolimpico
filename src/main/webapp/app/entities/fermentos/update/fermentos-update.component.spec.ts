jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { FermentosService } from '../service/fermentos.service';
import { IFermentos, Fermentos } from '../fermentos.model';

import { FermentosUpdateComponent } from './fermentos-update.component';

describe('Component Tests', () => {
  describe('Fermentos Management Update Component', () => {
    let comp: FermentosUpdateComponent;
    let fixture: ComponentFixture<FermentosUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let fermentosService: FermentosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [FermentosUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(FermentosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FermentosUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      fermentosService = TestBed.inject(FermentosService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const fermentos: IFermentos = { id: 456 };

        activatedRoute.data = of({ fermentos });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(fermentos));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const fermentos = { id: 123 };
        spyOn(fermentosService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ fermentos });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: fermentos }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(fermentosService.update).toHaveBeenCalledWith(fermentos);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const fermentos = new Fermentos();
        spyOn(fermentosService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ fermentos });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: fermentos }));
        saveSubject.complete();

        // THEN
        expect(fermentosService.create).toHaveBeenCalledWith(fermentos);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const fermentos = { id: 123 };
        spyOn(fermentosService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ fermentos });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(fermentosService.update).toHaveBeenCalledWith(fermentos);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
