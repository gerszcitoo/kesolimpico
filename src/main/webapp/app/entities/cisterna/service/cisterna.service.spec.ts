import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICisterna, Cisterna } from '../cisterna.model';

import { CisternaService } from './cisterna.service';

describe('Service Tests', () => {
  describe('Cisterna Service', () => {
    let service: CisternaService;
    let httpMock: HttpTestingController;
    let elemDefault: ICisterna;
    let expectedResult: ICisterna | ICisterna[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(CisternaService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        estado: 'AAAAAAA',
        volumen: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Cisterna', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Cisterna()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Cisterna', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            estado: 'BBBBBB',
            volumen: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Cisterna', () => {
        const patchObject = Object.assign(
          {
            estado: 'BBBBBB',
          },
          new Cisterna()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Cisterna', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            estado: 'BBBBBB',
            volumen: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Cisterna', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addCisternaToCollectionIfMissing', () => {
        it('should add a Cisterna to an empty array', () => {
          const cisterna: ICisterna = { id: 123 };
          expectedResult = service.addCisternaToCollectionIfMissing([], cisterna);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cisterna);
        });

        it('should not add a Cisterna to an array that contains it', () => {
          const cisterna: ICisterna = { id: 123 };
          const cisternaCollection: ICisterna[] = [
            {
              ...cisterna,
            },
            { id: 456 },
          ];
          expectedResult = service.addCisternaToCollectionIfMissing(cisternaCollection, cisterna);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Cisterna to an array that doesn't contain it", () => {
          const cisterna: ICisterna = { id: 123 };
          const cisternaCollection: ICisterna[] = [{ id: 456 }];
          expectedResult = service.addCisternaToCollectionIfMissing(cisternaCollection, cisterna);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cisterna);
        });

        it('should add only unique Cisterna to an array', () => {
          const cisternaArray: ICisterna[] = [{ id: 123 }, { id: 456 }, { id: 2475 }];
          const cisternaCollection: ICisterna[] = [{ id: 123 }];
          expectedResult = service.addCisternaToCollectionIfMissing(cisternaCollection, ...cisternaArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const cisterna: ICisterna = { id: 123 };
          const cisterna2: ICisterna = { id: 456 };
          expectedResult = service.addCisternaToCollectionIfMissing([], cisterna, cisterna2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(cisterna);
          expect(expectedResult).toContain(cisterna2);
        });

        it('should accept null and undefined values', () => {
          const cisterna: ICisterna = { id: 123 };
          expectedResult = service.addCisternaToCollectionIfMissing([], null, cisterna, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(cisterna);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
