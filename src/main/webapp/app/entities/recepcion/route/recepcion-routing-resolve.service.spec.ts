jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IRecepcion, Recepcion } from '../recepcion.model';
import { RecepcionService } from '../service/recepcion.service';

import { RecepcionRoutingResolveService } from './recepcion-routing-resolve.service';

describe('Service Tests', () => {
  describe('Recepcion routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: RecepcionRoutingResolveService;
    let service: RecepcionService;
    let resultRecepcion: IRecepcion | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(RecepcionRoutingResolveService);
      service = TestBed.inject(RecepcionService);
      resultRecepcion = undefined;
    });

    describe('resolve', () => {
      it('should return IRecepcion returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultRecepcion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultRecepcion).toEqual({ id: 123 });
      });

      it('should return new IRecepcion if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultRecepcion = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultRecepcion).toEqual(new Recepcion());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultRecepcion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultRecepcion).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
