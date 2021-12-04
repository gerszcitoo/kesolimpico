import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CisternaDTO } from '../service/dto/cisterna.dto';
import { CisternaMapper } from '../service/mapper/cisterna.mapper';
import { CisternaRepository } from '../repository/cisterna.repository';

const relationshipNames = [];

@Injectable()
export class CisternaService {
    logger = new Logger('CisternaService');

    constructor(@InjectRepository(CisternaRepository) private cisternaRepository: CisternaRepository) {}

    async findById(id: number): Promise<CisternaDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.cisternaRepository.findOne(id, options);
        return CisternaMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<CisternaDTO>): Promise<CisternaDTO | undefined> {
        const result = await this.cisternaRepository.findOne(options);
        return CisternaMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<CisternaDTO>): Promise<[CisternaDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.cisternaRepository.findAndCount(options);
        const cisternaDTO: CisternaDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(cisterna => cisternaDTO.push(CisternaMapper.fromEntityToDTO(cisterna)));
            resultList[0] = cisternaDTO;
        }
        return resultList;
    }

    async save(cisternaDTO: CisternaDTO, creator?: string): Promise<CisternaDTO | undefined> {
        const entity = CisternaMapper.fromDTOtoEntity(cisternaDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.cisternaRepository.save(entity);
        return CisternaMapper.fromEntityToDTO(result);
    }

    async update(cisternaDTO: CisternaDTO, updater?: string): Promise<CisternaDTO | undefined> {
        const entity = CisternaMapper.fromDTOtoEntity(cisternaDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.cisternaRepository.save(entity);
        return CisternaMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.cisternaRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
