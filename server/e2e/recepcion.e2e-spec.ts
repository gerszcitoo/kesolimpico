import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { RecepcionDTO } from '../src/service/dto/recepcion.dto';
import { RecepcionService } from '../src/service/recepcion.service';

describe('Recepcion Controller', () => {
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
            .overrideProvider(RecepcionService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all recepcions ', async () => {
        const getEntities: RecepcionDTO[] = (
            await request(app.getHttpServer())
                .get('/api/recepcions')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET recepcions by id', async () => {
        const getEntity: RecepcionDTO = (
            await request(app.getHttpServer())
                .get('/api/recepcions/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create recepcions', async () => {
        const createdEntity: RecepcionDTO = (
            await request(app.getHttpServer())
                .post('/api/recepcions')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update recepcions', async () => {
        const updatedEntity: RecepcionDTO = (
            await request(app.getHttpServer())
                .put('/api/recepcions')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update recepcions from id', async () => {
        const updatedEntity: RecepcionDTO = (
            await request(app.getHttpServer())
                .put('/api/recepcions/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE recepcions', async () => {
        const deletedEntity: RecepcionDTO = (
            await request(app.getHttpServer())
                .delete('/api/recepcions/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
