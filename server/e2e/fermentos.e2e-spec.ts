import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { FermentosDTO } from '../src/service/dto/fermentos.dto';
import { FermentosService } from '../src/service/fermentos.service';

describe('Fermentos Controller', () => {
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
            .overrideProvider(FermentosService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all fermentos ', async () => {
        const getEntities: FermentosDTO[] = (
            await request(app.getHttpServer())
                .get('/api/fermentos')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET fermentos by id', async () => {
        const getEntity: FermentosDTO = (
            await request(app.getHttpServer())
                .get('/api/fermentos/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create fermentos', async () => {
        const createdEntity: FermentosDTO = (
            await request(app.getHttpServer())
                .post('/api/fermentos')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update fermentos', async () => {
        const updatedEntity: FermentosDTO = (
            await request(app.getHttpServer())
                .put('/api/fermentos')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update fermentos from id', async () => {
        const updatedEntity: FermentosDTO = (
            await request(app.getHttpServer())
                .put('/api/fermentos/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE fermentos', async () => {
        const deletedEntity: FermentosDTO = (
            await request(app.getHttpServer())
                .delete('/api/fermentos/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
