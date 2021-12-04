import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormConfig } from './orm.config';
import { config } from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CisternaModule } from './module/cisterna.module';
import { RecepcionModule } from './module/recepcion.module';
import { FermentosModule } from './module/fermentos.module';
import { SectorProduccionModule } from './module/sector-produccion.module';
import { SectorCuradoModule } from './module/sector-curado.module';
import { SaladeroModule } from './module/saladero.module';
import { AlmacenModule } from './module/almacen.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
    imports: [
        TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
        ServeStaticModule.forRoot({
            rootPath: config.getClientPath(),
        }),
        AuthModule,
        CisternaModule,
        RecepcionModule,
        FermentosModule,
        SectorProduccionModule,
        SectorCuradoModule,
        SaladeroModule,
        AlmacenModule,
        // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
    ],
    controllers: [
        // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
    ],
    providers: [
        // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
    ],
})
export class AppModule {}
