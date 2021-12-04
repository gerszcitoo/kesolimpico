import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { SaladeroDTO } from '../src/service/dto/saladero.dto';
import { SaladeroService } from '../src/service/saladero.service';

describe('Saladero Controller', () => {
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
            .overrideProvider(SaladeroService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all saladeros ', async () => {
        const getEntities: SaladeroDTO[] = (
            await request(app.getHttpServer())
                .get('/api/saladeros')
                .expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET saladeros by id', async () => {
        const getEntity: SaladeroDTO = (
            await request(app.getHttpServer())
                .get('/api/saladeros/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create saladeros', async () => {
        const createdEntity: SaladeroDTO = (
            await request(app.getHttpServer())
                .post('/api/saladeros')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update saladeros', async () => {
        const updatedEntity: SaladeroDTO = (
            await request(app.getHttpServer())
                .put('/api/saladeros')
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update saladeros from id', async () => {
        const updatedEntity: SaladeroDTO = (
            await request(app.getHttpServer())
                .put('/api/saladeros/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE saladeros', async () => {
        const deletedEntity: SaladeroDTO = (
            await request(app.getHttpServer())
                .delete('/api/saladeros/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
