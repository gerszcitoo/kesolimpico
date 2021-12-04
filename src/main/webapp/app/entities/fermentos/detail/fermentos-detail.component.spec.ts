import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FermentosDetailComponent } from './fermentos-detail.component';

describe('Component Tests', () => {
  describe('Fermentos Management Detail Component', () => {
    let comp: FermentosDetailComponent;
    let fixture: ComponentFixture<FermentosDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [FermentosDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ fermentos: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(FermentosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FermentosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load fermentos on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fermentos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
