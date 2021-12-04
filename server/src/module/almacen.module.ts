import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlmacenController } from '../web/rest/almacen.controller';
import { AlmacenRepository } from '../repository/almacen.repository';
import { AlmacenService } from '../service/almacen.service';

@Module({
    imports: [TypeOrmModule.forFeature([AlmacenRepository])],
    controllers: [AlmacenController],
    providers: [AlmacenService],
    exports: [AlmacenService],
})
export class AlmacenModule {}
