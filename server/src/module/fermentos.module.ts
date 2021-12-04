import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FermentosController } from '../web/rest/fermentos.controller';
import { FermentosRepository } from '../repository/fermentos.repository';
import { FermentosService } from '../service/fermentos.service';

@Module({
    imports: [TypeOrmModule.forFeature([FermentosRepository])],
    controllers: [FermentosController],
    providers: [FermentosService],
    exports: [FermentosService],
})
export class FermentosModule {}
