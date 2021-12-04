import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISectorCurado, SectorCurado } from '../sector-curado.model';

import { SectorCuradoService } from './sector-curado.service';

describe('Service Tests', () => {
  describe('SectorCurado Service', () => {
    let service: SectorCuradoService;
    let httpMock: HttpTestingController;
    let elemDefault: ISectorCurado;
    let expectedResult: ISectorCurado | ISectorCurado[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(SectorCuradoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        fechaEnt: currentDate,
        fechaSal: currentDate,
        temperatura: 0,
        calidad: 0,
        humedad: 0,
        co2: 0,
        pesoEnt: 0,
        pesoSal: 0,
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

      it('should create a SectorCurado', () => {
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

        service.create(new SectorCurado()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SectorCurado', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fechaEnt: currentDate.format(DATE_TIME_FORMAT),
            fechaSal: currentDate.format(DATE_TIME_FORMAT),
            temperatura: 1,
            calidad: 1,
            humedad: 1,
            co2: 1,
            pesoEnt: 1,
            pesoSal: 1,
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

      it('should partial update a SectorCurado', () => {
        const patchObject = Object.assign(
          {
            fechaEnt: currentDate.format(DATE_TIME_FORMAT),
            fechaSal: currentDate.format(DATE_TIME_FORMAT),
            calidad: 1,
            co2: 1,
            pesoSal: 1,
          },
          new SectorCurado()
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

      it('should return a list of SectorCurado', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            fechaEnt: currentDate.format(DATE_TIME_FORMAT),
            fechaSal: currentDate.format(DATE_TIME_FORMAT),
            temperatura: 1,
            calidad: 1,
            humedad: 1,
            co2: 1,
            pesoEnt: 1,
            pesoSal: 1,
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

      it('should delete a SectorCurado', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addSectorCuradoToCollectionIfMissing', () => {
        it('should add a SectorCurado to an empty array', () => {
          const sectorCurado: ISectorCurado = { id: 123 };
          expectedResult = service.addSectorCuradoToCollectionIfMissing([], sectorCurado);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(sectorCurado);
        });

        it('should not add a SectorCurado to an array that contains it', () => {
          const sectorCurado: ISectorCurado = { id: 123 };
          const sectorCuradoCollection: ISectorCurado[] = [
            {
              ...sectorCurado,
            },
            { id: 456 },
          ];
          expectedResult = service.addSectorCuradoToCollectionIfMissing(sectorCuradoCollection, sectorCurado);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a SectorCurado to an array that doesn't contain it", () => {
          const sectorCurado: ISectorCurado = { id: 123 };
          const sectorCuradoCollection: ISectorCurado[] = [{ id: 456 }];
          expectedResult = service.addSectorCuradoToCollectionIfMissing(sectorCuradoCollection, sectorCurado);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(sectorCurado);
        });

        it('should add only unique SectorCurado to an array', () => {
          const sectorCuradoArray: ISectorCurado[] = [{ id: 123 }, { id: 456 }, { id: 36775 }];
          const sectorCuradoCollection: ISectorCurado[] = [{ id: 123 }];
          expectedResult = service.addSectorCuradoToCollectionIfMissing(sectorCuradoCollection, ...sectorCuradoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const sectorCurado: ISectorCurado = { id: 123 };
          const sectorCurado2: ISectorCurado = { id: 456 };
          expectedResult = service.addSectorCuradoToCollectionIfMissing([], sectorCurado, sectorCurado2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(sectorCurado);
          expect(expectedResult).toContain(sectorCurado2);
        });

        it('should accept null and undefined values', () => {
          const sectorCurado: ISectorCurado = { id: 123 };
          expectedResult = service.addSectorCuradoToCollectionIfMissing([], null, sectorCurado, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(sectorCurado);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
