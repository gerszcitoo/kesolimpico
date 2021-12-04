import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SectorCuradoDetailComponent } from './sector-curado-detail.component';

describe('Component Tests', () => {
  describe('SectorCurado Management Detail Component', () => {
    let comp: SectorCuradoDetailComponent;
    let fixture: ComponentFixture<SectorCuradoDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SectorCuradoDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ sectorCurado: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(SectorCuradoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SectorCuradoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sectorCurado on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sectorCurado).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
