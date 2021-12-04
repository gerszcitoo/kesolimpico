import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RecepcionDetailComponent } from './recepcion-detail.component';

describe('Component Tests', () => {
  describe('Recepcion Management Detail Component', () => {
    let comp: RecepcionDetailComponent;
    let fixture: ComponentFixture<RecepcionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [RecepcionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ recepcion: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(RecepcionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecepcionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load recepcion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.recepcion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
