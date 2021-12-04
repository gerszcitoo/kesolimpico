jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISaladero, Saladero } from '../saladero.model';
import { SaladeroService } from '../service/saladero.service';

import { SaladeroRoutingResolveService } from './saladero-routing-resolve.service';

describe('Service Tests', () => {
  describe('Saladero routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: SaladeroRoutingResolveService;
    let service: SaladeroService;
    let resultSaladero: ISaladero | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(SaladeroRoutingResolveService);
      service = TestBed.inject(SaladeroService);
      resultSaladero = undefined;
    });

    describe('resolve', () => {
      it('should return ISaladero returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSaladero = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSaladero).toEqual({ id: 123 });
      });

      it('should return new ISaladero if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSaladero = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultSaladero).toEqual(new Saladero());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSaladero = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSaladero).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
