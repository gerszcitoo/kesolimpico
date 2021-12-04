import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CisternaDetailComponent } from './cisterna-detail.component';

describe('Component Tests', () => {
  describe('Cisterna Management Detail Component', () => {
    let comp: CisternaDetailComponent;
    let fixture: ComponentFixture<CisternaDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [CisternaDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ cisterna: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(CisternaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CisternaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cisterna on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cisterna).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
