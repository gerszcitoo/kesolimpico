import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CisternaController } from '../web/rest/cisterna.controller';
import { CisternaRepository } from '../repository/cisterna.repository';
import { CisternaService } from '../service/cisterna.service';

@Module({
    imports: [TypeOrmModule.forFeature([CisternaRepository])],
    controllers: [CisternaController],
    providers: [CisternaService],
    exports: [CisternaService],
})
export class CisternaModule {}
