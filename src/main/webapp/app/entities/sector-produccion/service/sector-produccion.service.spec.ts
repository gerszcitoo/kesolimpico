import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ISectorProduccion, SectorProduccion } from '../sector-produccion.model';

import { SectorProduccionService } from './sector-produccion.service';

describe('Service Tests', () => {
  describe('SectorProduccion Service', () => {
    let service: SectorProduccionService;
    let httpMock: HttpTestingController;
    let elemDefault: ISectorProduccion;
    let expectedResult: ISectorProduccion | ISectorProduccion[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(SectorProduccionService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        peso: 0,
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

      it('should create a SectorProduccion', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new SectorProduccion()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SectorProduccion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            peso: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a SectorProduccion', () => {
        const patchObject = Object.assign({}, new SectorProduccion());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SectorProduccion', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            peso: 1,
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

      it('should delete a SectorProduccion', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addSectorProduccionToCollectionIfMissing', () => {
        it('should add a SectorProduccion to an empty array', () => {
          const sectorProduccion: ISectorProduccion = { id: 123 };
          expectedResult = service.addSectorProduccionToCollectionIfMissing([], sectorProduccion);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(sectorProduccion);
        });

        it('should not add a SectorProduccion to an array that contains it', () => {
          const sectorProduccion: ISectorProduccion = { id: 123 };
          const sectorProduccionCollection: ISectorProduccion[] = [
            {
              ...sectorProduccion,
            },
            { id: 456 },
          ];
          expectedResult = service.addSectorProduccionToCollectionIfMissing(sectorProduccionCollection, sectorProduccion);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a SectorProduccion to an array that doesn't contain it", () => {
          const sectorProduccion: ISectorProduccion = { id: 123 };
          const sectorProduccionCollection: ISectorProduccion[] = [{ id: 456 }];
          expectedResult = service.addSectorProduccionToCollectionIfMissing(sectorProduccionCollection, sectorProduccion);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(sectorProduccion);
        });

        it('should add only unique SectorProduccion to an array', () => {
          const sectorProduccionArray: ISectorProduccion[] = [{ id: 123 }, { id: 456 }, { id: 91336 }];
          const sectorProduccionCollection: ISectorProduccion[] = [{ id: 123 }];
          expectedResult = service.addSectorProduccionToCollectionIfMissing(sectorProduccionCollection, ...sectorProduccionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const sectorProduccion: ISectorProduccion = { id: 123 };
          const sectorProduccion2: ISectorProduccion = { id: 456 };
          expectedResult = service.addSectorProduccionToCollectionIfMissing([], sectorProduccion, sectorProduccion2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(sectorProduccion);
          expect(expectedResult).toContain(sectorProduccion2);
        });

        it('should accept null and undefined values', () => {
          const sectorProduccion: ISectorProduccion = { id: 123 };
          expectedResult = service.addSectorProduccionToCollectionIfMissing([], null, sectorProduccion, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(sectorProduccion);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
