jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IFermentos, Fermentos } from '../fermentos.model';
import { FermentosService } from '../service/fermentos.service';

import { FermentosRoutingResolveService } from './fermentos-routing-resolve.service';

describe('Service Tests', () => {
  describe('Fermentos routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: FermentosRoutingResolveService;
    let service: FermentosService;
    let resultFermentos: IFermentos | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(FermentosRoutingResolveService);
      service = TestBed.inject(FermentosService);
      resultFermentos = undefined;
    });

    describe('resolve', () => {
      it('should return IFermentos returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultFermentos = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultFermentos).toEqual({ id: 123 });
      });

      it('should return new IFermentos if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultFermentos = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultFermentos).toEqual(new Fermentos());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultFermentos = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultFermentos).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
