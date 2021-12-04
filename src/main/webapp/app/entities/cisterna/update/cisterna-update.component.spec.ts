jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CisternaService } from '../service/cisterna.service';
import { ICisterna, Cisterna } from '../cisterna.model';

import { CisternaUpdateComponent } from './cisterna-update.component';

describe('Component Tests', () => {
  describe('Cisterna Management Update Component', () => {
    let comp: CisternaUpdateComponent;
    let fixture: ComponentFixture<CisternaUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let cisternaService: CisternaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CisternaUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CisternaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CisternaUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      cisternaService = TestBed.inject(CisternaService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const cisterna: ICisterna = { id: 456 };

        activatedRoute.data = of({ cisterna });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(cisterna));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cisterna = { id: 123 };
        spyOn(cisternaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cisterna });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cisterna }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(cisternaService.update).toHaveBeenCalledWith(cisterna);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cisterna = new Cisterna();
        spyOn(cisternaService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cisterna });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: cisterna }));
        saveSubject.complete();

        // THEN
        expect(cisternaService.create).toHaveBeenCalledWith(cisterna);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const cisterna = { id: 123 };
        spyOn(cisternaService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ cisterna });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(cisternaService.update).toHaveBeenCalledWith(cisterna);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
