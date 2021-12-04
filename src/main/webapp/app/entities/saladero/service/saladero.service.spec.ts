import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISaladero, Saladero } from '../saladero.model';

import { SaladeroService } from './saladero.service';

describe('Service Tests', () => {
  describe('Saladero Service', () => {
    let service: SaladeroService;
    let httpMock: HttpTestingController;
    let elemDefault: ISaladero;
    let expectedResult: ISaladero | ISaladero[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(SaladeroService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        fechaEnt: currentDate,
        fechaSal: currentDate,
        peso: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaEnt: currentDate.format(DATE_TIME_FORMAT),
            fechaSal: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Saladero', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaEnt: currentDate.format(DATE_TIME_FORMAT),
            fechaSal: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaEnt: currentDate,
            fechaSal: currentDate,
          },
          returnedFromService
        );

        service.create(new Saladero()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Saladero', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fechaEnt: currentDate.format(DATE_TIME_FORMAT),
            fechaSal: currentDate.format(DATE_TIME_FORMAT),
            peso: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaEnt: currentDate,
            fechaSal: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Saladero', () => {
        const patchObject = Object.assign(
          {
            peso: 1,
          },
          new Saladero()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            fechaEnt: currentDate,
            fechaSal: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Saladero', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fechaEnt: currentDate.format(DATE_TIME_FORMAT),
            fechaSal: currentDate.format(DATE_TIME_FORMAT),
            peso: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaEnt: currentDate,
            fechaSal: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Saladero', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addSaladeroToCollectionIfMissing', () => {
        it('should add a Saladero to an empty array', () => {
          const saladero: ISaladero = { id: 123 };
          expectedResult = service.addSaladeroToCollectionIfMissing([], saladero);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(saladero);
        });

        it('should not add a Saladero to an array that contains it', () => {
          const saladero: ISaladero = { id: 123 };
          const saladeroCollection: ISaladero[] = [
            {
              ...saladero,
            },
            { id: 456 },
          ];
          expectedResult = service.addSaladeroToCollectionIfMissing(saladeroCollection, saladero);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Saladero to an array that doesn't contain it", () => {
          const saladero: ISaladero = { id: 123 };
          const saladeroCollection: ISaladero[] = [{ id: 456 }];
          expectedResult = service.addSaladeroToCollectionIfMissing(saladeroCollection, saladero);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(saladero);
        });

        it('should add only unique Saladero to an array', () => {
          const saladeroArray: ISaladero[] = [{ id: 123 }, { id: 456 }, { id: 36714 }];
          const saladeroCollection: ISaladero[] = [{ id: 123 }];
          expectedResult = service.addSaladeroToCollectionIfMissing(saladeroCollection, ...saladeroArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const saladero: ISaladero = { id: 123 };
          const saladero2: ISaladero = { id: 456 };
          expectedResult = service.addSaladeroToCollectionIfMissing([], saladero, saladero2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(saladero);
          expect(expectedResult).toContain(saladero2);
        });

        it('should accept null and undefined values', () => {
          const saladero: ISaladero = { id: 123 };
          expectedResult = service.addSaladeroToCollectionIfMissing([], null, saladero, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(saladero);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
