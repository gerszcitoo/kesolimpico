jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IAlmacen, Almacen } from '../almacen.model';
import { AlmacenService } from '../service/almacen.service';

import { AlmacenRoutingResolveService } from './almacen-routing-resolve.service';

describe('Service Tests', () => {
  describe('Almacen routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: AlmacenRoutingResolveService;
    let service: AlmacenService;
    let resultAlmacen: IAlmacen | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(AlmacenRoutingResolveService);
      service = TestBed.inject(AlmacenService);
      resultAlmacen = undefined;
    });

    describe('resolve', () => {
      it('should return IAlmacen returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAlmacen = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAlmacen).toEqual({ id: 123 });
      });

      it('should return new IAlmacen if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAlmacen = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultAlmacen).toEqual(new Almacen());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAlmacen = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAlmacen).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
