import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecepcionController } from '../web/rest/recepcion.controller';
import { RecepcionRepository } from '../repository/recepcion.repository';
import { RecepcionService } from '../service/recepcion.service';

@Module({
    imports: [TypeOrmModule.forFeature([RecepcionRepository])],
    controllers: [RecepcionController],
    providers: [RecepcionService],
    exports: [RecepcionService],
})
export class RecepcionModule {}
