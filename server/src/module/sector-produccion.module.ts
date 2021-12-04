import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorProduccionController } from '../web/rest/sector-produccion.controller';
import { SectorProduccionRepository } from '../repository/sector-produccion.repository';
import { SectorProduccionService } from '../service/sector-produccion.service';

@Module({
    imports: [TypeOrmModule.forFeature([SectorProduccionRepository])],
    controllers: [SectorProduccionController],
    providers: [SectorProduccionService],
    exports: [SectorProduccionService],
})
export class SectorProduccionModule {}
