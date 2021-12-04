import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IFermentos, Fermentos } from '../fermentos.model';

import { FermentosService } from './fermentos.service';

describe('Service Tests', () => {
  describe('Fermentos Service', () => {
    let service: FermentosService;
    let httpMock: HttpTestingController;
    let elemDefault: IFermentos;
    let expectedResult: IFermentos | IFermentos[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(FermentosService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        fecha: currentDate,
        peso: 0,
        calidad: 0,
        detalle: 'AAAAAAA',
        tipoQueso: 'AAAAAAA',
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

      it('should create a Fermentos', () => {
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

        service.create(new Fermentos()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Fermentos', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fecha: currentDate.format(DATE_TIME_FORMAT),
            peso: 1,
            calidad: 1,
            detalle: 'BBBBBB',
            tipoQueso: 'BBBBBB',
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

      it('should partial update a Fermentos', () => {
        const patchObject = Object.assign(
          {
            calidad: 1,
          },
          new Fermentos()
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

      it('should return a list of Fermentos', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fecha: currentDate.format(DATE_TIME_FORMAT),
            peso: 1,
            calidad: 1,
            detalle: 'BBBBBB',
            tipoQueso: 'BBBBBB',
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

      it('should delete a Fermentos', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addFermentosToCollectionIfMissing', () => {
        it('should add a Fermentos to an empty array', () => {
          const fermentos: IFermentos = { id: 123 };
          expectedResult = service.addFermentosToCollectionIfMissing([], fermentos);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(fermentos);
        });

        it('should not add a Fermentos to an array that contains it', () => {
          const fermentos: IFermentos = { id: 123 };
          const fermentosCollection: IFermentos[] = [
            {
              ...fermentos,
            },
            { id: 456 },
          ];
          expectedResult = service.addFermentosToCollectionIfMissing(fermentosCollection, fermentos);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Fermentos to an array that doesn't contain it", () => {
          const fermentos: IFermentos = { id: 123 };
          const fermentosCollection: IFermentos[] = [{ id: 456 }];
          expectedResult = service.addFermentosToCollectionIfMissing(fermentosCollection, fermentos);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(fermentos);
        });

        it('should add only unique Fermentos to an array', () => {
          const fermentosArray: IFermentos[] = [{ id: 123 }, { id: 456 }, { id: 79580 }];
          const fermentosCollection: IFermentos[] = [{ id: 123 }];
          expectedResult = service.addFermentosToCollectionIfMissing(fermentosCollection, ...fermentosArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const fermentos: IFermentos = { id: 123 };
          const fermentos2: IFermentos = { id: 456 };
          expectedResult = service.addFermentosToCollectionIfMissing([], fermentos, fermentos2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(fermentos);
          expect(expectedResult).toContain(fermentos2);
        });

        it('should accept null and undefined values', () => {
          const fermentos: IFermentos = { id: 123 };
          expectedResult = service.addFermentosToCollectionIfMissing([], null, fermentos, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(fermentos);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
