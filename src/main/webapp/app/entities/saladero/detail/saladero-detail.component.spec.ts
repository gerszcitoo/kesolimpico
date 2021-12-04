import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SaladeroDetailComponent } from './saladero-detail.component';

describe('Component Tests', () => {
  describe('Saladero Management Detail Component', () => {
    let comp: SaladeroDetailComponent;
    let fixture: ComponentFixture<SaladeroDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SaladeroDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ saladero: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(SaladeroDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SaladeroDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load saladero on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.saladero).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
