import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { AlmacenDTO } from '../src/service/dto/almacen.dto';
import { AlmacenService } from '../src/service/almacen.service';

describe('Almacen Controller', () => {
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
            .overrideProvider(AlmacenService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all almacens ', async () => {
        const getEntities: AlmacenDTO[] = (
            await request(app.getHttpServer())
                .get('/api/almacens')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET almacens by id', async () => {
        const getEntity: AlmacenDTO = (
            await request(app.getHttpServer())
                .get('/api/almacens/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create almacens', async () => {
        const createdEntity: AlmacenDTO = (
            await request(app.getHttpServer())
                .post('/api/almacens')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update almacens', async () => {
        const updatedEntity: AlmacenDTO = (
            await request(app.getHttpServer())
                .put('/api/almacens')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update almacens from id', async () => {
        const updatedEntity: AlmacenDTO = (
            await request(app.getHttpServer())
                .put('/api/almacens/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE almacens', async () => {
        const deletedEntity: AlmacenDTO = (
            await request(app.getHttpServer())
                .delete('/api/almacens/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
