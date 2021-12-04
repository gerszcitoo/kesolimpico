import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaladeroController } from '../web/rest/saladero.controller';
import { SaladeroRepository } from '../repository/saladero.repository';
import { SaladeroService } from '../service/saladero.service';

@Module({
    imports: [TypeOrmModule.forFeature([SaladeroRepository])],
    controllers: [SaladeroController],
    providers: [SaladeroService],
    exports: [SaladeroService],
})
export class SaladeroModule {}
