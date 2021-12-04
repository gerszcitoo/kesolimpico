import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorCuradoController } from '../web/rest/sector-curado.controller';
import { SectorCuradoRepository } from '../repository/sector-curado.repository';
import { SectorCuradoService } from '../service/sector-curado.service';

@Module({
    imports: [TypeOrmModule.forFeature([SectorCuradoRepository])],
    controllers: [SectorCuradoController],
    providers: [SectorCuradoService],
    exports: [SectorCuradoService],
})
export class SectorCuradoModule {}
