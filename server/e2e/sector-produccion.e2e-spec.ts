import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { SectorProduccionDTO } from '../src/service/dto/sector-produccion.dto';
import { SectorProduccionService } from '../src/service/sector-produccion.service';

describe('SectorProduccion Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(SectorProduccionService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all sector-produccions ', async () => {
        const getEntities: SectorProduccionDTO[] = (
            await request(app.getHttpServer())
                .get('/api/sector-produccions')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET sector-produccions by id', async () => {
        const getEntity: SectorProduccionDTO = (
            await request(app.getHttpServer())
                .get('/api/sector-produccions/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create sector-produccions', async () => {
        const createdEntity: SectorProduccionDTO = (
            await request(app.getHttpServer())
                .post('/api/sector-produccions')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update sector-produccions', async () => {
        const updatedEntity: SectorProduccionDTO = (
            await request(app.getHttpServer())
                .put('/api/sector-produccions')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update sector-produccions from id', async () => {
        const updatedEntity: SectorProduccionDTO = (
            await request(app.getHttpServer())
                .put('/api/sector-produccions/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE sector-produccions', async () => {
        const deletedEntity: SectorProduccionDTO = (
            await request(app.getHttpServer())
                .delete('/api/sector-produccions/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
