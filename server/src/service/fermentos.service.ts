import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { FermentosDTO } from '../service/dto/fermentos.dto';
import { FermentosMapper } from '../service/mapper/fermentos.mapper';
import { FermentosRepository } from '../repository/fermentos.repository';

const relationshipNames = [];

@Injectable()
export class FermentosService {
    logger = new Logger('FermentosService');

    constructor(@InjectRepository(FermentosRepository) private fermentosRepository: FermentosRepository) {}

    async findById(id: number): Promise<FermentosDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.fermentosRepository.findOne(id, options);
        return FermentosMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<FermentosDTO>): Promise<FermentosDTO | undefined> {
        const result = await this.fermentosRepository.findOne(options);
        return FermentosMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<FermentosDTO>): Promise<[FermentosDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.fermentosRepository.findAndCount(options);
        const fermentosDTO: FermentosDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(fermentos => fermentosDTO.push(FermentosMapper.fromEntityToDTO(fermentos)));
            resultList[0] = fermentosDTO;
        }
        return resultList;
    }

    async save(fermentosDTO: FermentosDTO, creator?: string): Promise<FermentosDTO | undefined> {
        const entity = FermentosMapper.fromDTOtoEntity(fermentosDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.fermentosRepository.save(entity);
        return FermentosMapper.fromEntityToDTO(result);
    }

    async update(fermentosDTO: FermentosDTO, updater?: string): Promise<FermentosDTO | undefined> {
        const entity = FermentosMapper.fromDTOtoEntity(fermentosDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.fermentosRepository.save(entity);
        return FermentosMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.fermentosRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
