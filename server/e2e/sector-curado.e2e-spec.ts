import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { SectorCuradoDTO } from '../src/service/dto/sector-curado.dto';
import { SectorCuradoService } from '../src/service/sector-curado.service';

describe('SectorCurado Controller', () => {
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
            .overrideProvider(SectorCuradoService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all sector-curados ', async () => {
        const getEntities: SectorCuradoDTO[] = (
            await request(app.getHttpServer())
                .get('/api/sector-curados')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET sector-curados by id', async () => {
        const getEntity: SectorCuradoDTO = (
            await request(app.getHttpServer())
                .get('/api/sector-curados/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create sector-curados', async () => {
        const createdEntity: SectorCuradoDTO = (
            await request(app.getHttpServer())
                .post('/api/sector-curados')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update sector-curados', async () => {
        const updatedEntity: SectorCuradoDTO = (
            await request(app.getHttpServer())
                .put('/api/sector-curados')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update sector-curados from id', async () => {
        const updatedEntity: SectorCuradoDTO = (
            await request(app.getHttpServer())
                .put('/api/sector-curados/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE sector-curados', async () => {
        const deletedEntity: SectorCuradoDTO = (
            await request(app.getHttpServer())
                .delete('/api/sector-curados/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
