import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { SaladeroDTO } from '../service/dto/saladero.dto';
import { SaladeroMapper } from '../service/mapper/saladero.mapper';
import { SaladeroRepository } from '../repository/saladero.repository';

const relationshipNames = [];

@Injectable()
export class SaladeroService {
    logger = new Logger('SaladeroService');

    constructor(@InjectRepository(SaladeroRepository) private saladeroRepository: SaladeroRepository) {}

    async findById(id: number): Promise<SaladeroDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.saladeroRepository.findOne(id, options);
        return SaladeroMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<SaladeroDTO>): Promise<SaladeroDTO | undefined> {
        const result = await this.saladeroRepository.findOne(options);
        return SaladeroMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<SaladeroDTO>): Promise<[SaladeroDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.saladeroRepository.findAndCount(options);
        const saladeroDTO: SaladeroDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(saladero => saladeroDTO.push(SaladeroMapper.fromEntityToDTO(saladero)));
            resultList[0] = saladeroDTO;
        }
        return resultList;
    }

    async save(saladeroDTO: SaladeroDTO, creator?: string): Promise<SaladeroDTO | undefined> {
        const entity = SaladeroMapper.fromDTOtoEntity(saladeroDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.saladeroRepository.save(entity);
        return SaladeroMapper.fromEntityToDTO(result);
    }

    async update(saladeroDTO: SaladeroDTO, updater?: string): Promise<SaladeroDTO | undefined> {
        const entity = SaladeroMapper.fromDTOtoEntity(saladeroDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.saladeroRepository.save(entity);
        return SaladeroMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.saladeroRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
