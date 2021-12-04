import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SectorProduccionDetailComponent } from './sector-produccion-detail.component';

describe('Component Tests', () => {
  describe('SectorProduccion Management Detail Component', () => {
    let comp: SectorProduccionDetailComponent;
    let fixture: ComponentFixture<SectorProduccionDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SectorProduccionDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ sectorProduccion: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(SectorProduccionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SectorProduccionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sectorProduccion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sectorProduccion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
