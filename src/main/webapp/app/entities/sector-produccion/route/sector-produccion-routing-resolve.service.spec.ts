jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISectorProduccion, SectorProduccion } from '../sector-produccion.model';
import { SectorProduccionService } from '../service/sector-produccion.service';

import { SectorProduccionRoutingResolveService } from './sector-produccion-routing-resolve.service';

describe('Service Tests', () => {
  describe('SectorProduccion routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: SectorProduccionRoutingResolveService;
    let service: SectorProduccionService;
    let resultSectorProduccion: ISectorProduccion | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(SectorProduccionRoutingResolveService);
      service = TestBed.inject(SectorProduccionService);
      resultSectorProduccion = undefined;
    });

    describe('resolve', () => {
      it('should return ISectorProduccion returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSectorProduccion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSectorProduccion).toEqual({ id: 123 });
      });

      it('should return new ISectorProduccion if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSectorProduccion = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultSectorProduccion).toEqual(new SectorProduccion());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSectorProduccion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSectorProduccion).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
