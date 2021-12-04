import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IRecepcion, Recepcion } from '../recepcion.model';

import { RecepcionService } from './recepcion.service';

describe('Service Tests', () => {
  describe('Recepcion Service', () => {
    let service: RecepcionService;
    let httpMock: HttpTestingController;
    let elemDefault: IRecepcion;
    let expectedResult: IRecepcion | IRecepcion[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(RecepcionService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        fecha: currentDate,
        calidad: 0,
        cantidad: 0,
        analisis: 'AAAAAAA',
        tambo: 'AAAAAAA',
        temperatura: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fecha: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Recepcion', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fecha: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        service.create(new Recepcion()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Recepcion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fecha: currentDate.format(DATE_TIME_FORMAT),
            calidad: 1,
            cantidad: 1,
            analisis: 'BBBBBB',
            tambo: 'BBBBBB',
            temperatura: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Recepcion', () => {
        const patchObject = Object.assign(
          {
            calidad: 1,
            analisis: 'BBBBBB',
            temperatura: 1,
          },
          new Recepcion()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Recepcion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fecha: currentDate.format(DATE_TIME_FORMAT),
            calidad: 1,
            cantidad: 1,
            analisis: 'BBBBBB',
            tambo: 'BBBBBB',
            temperatura: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fecha: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Recepcion', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addRecepcionToCollectionIfMissing', () => {
        it('should add a Recepcion to an empty array', () => {
          const recepcion: IRecepcion = { id: 123 };
          expectedResult = service.addRecepcionToCollectionIfMissing([], recepcion);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(recepcion);
        });

        it('should not add a Recepcion to an array that contains it', () => {
          const recepcion: IRecepcion = { id: 123 };
          const recepcionCollection: IRecepcion[] = [
            {
              ...recepcion,
            },
            { id: 456 },
          ];
          expectedResult = service.addRecepcionToCollectionIfMissing(recepcionCollection, recepcion);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Recepcion to an array that doesn't contain it", () => {
          const recepcion: IRecepcion = { id: 123 };
          const recepcionCollection: IRecepcion[] = [{ id: 456 }];
          expectedResult = service.addRecepcionToCollectionIfMissing(recepcionCollection, recepcion);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(recepcion);
        });

        it('should add only unique Recepcion to an array', () => {
          const recepcionArray: IRecepcion[] = [{ id: 123 }, { id: 456 }, { id: 85641 }];
          const recepcionCollection: IRecepcion[] = [{ id: 123 }];
          expectedResult = service.addRecepcionToCollectionIfMissing(recepcionCollection, ...recepcionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const recepcion: IRecepcion = { id: 123 };
          const recepcion2: IRecepcion = { id: 456 };
          expectedResult = service.addRecepcionToCollectionIfMissing([], recepcion, recepcion2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(recepcion);
          expect(expectedResult).toContain(recepcion2);
        });

        it('should accept null and undefined values', () => {
          const recepcion: IRecepcion = { id: 123 };
          expectedResult = service.addRecepcionToCollectionIfMissing([], null, recepcion, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(recepcion);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
