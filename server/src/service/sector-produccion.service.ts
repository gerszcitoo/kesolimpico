import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { SectorProduccionDTO } from '../service/dto/sector-produccion.dto';
import { SectorProduccionMapper } from '../service/mapper/sector-produccion.mapper';
import { SectorProduccionRepository } from '../repository/sector-produccion.repository';

const relationshipNames = [];
relationshipNames.push('fermentos');
relationshipNames.push('recepcion');

@Injectable()
export class SectorProduccionService {
    logger = new Logger('SectorProduccionService');

    constructor(
        @InjectRepository(SectorProduccionRepository) private sectorProduccionRepository: SectorProduccionRepository,
    ) {}

    async findById(id: number): Promise<SectorProduccionDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.sectorProduccionRepository.findOne(id, options);
        return SectorProduccionMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<SectorProduccionDTO>): Promise<SectorProduccionDTO | undefined> {
        const result = await this.sectorProduccionRepository.findOne(options);
        return SectorProduccionMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<SectorProduccionDTO>): Promise<[SectorProduccionDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.sectorProduccionRepository.findAndCount(options);
        const sectorProduccionDTO: SectorProduccionDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(sectorProduccion =>
                sectorProduccionDTO.push(SectorProduccionMapper.fromEntityToDTO(sectorProduccion)),
            );
            resultList[0] = sectorProduccionDTO;
        }
        return resultList;
    }

    async save(sectorProduccionDTO: SectorProduccionDTO, creator?: string): Promise<SectorProduccionDTO | undefined> {
        const entity = SectorProduccionMapper.fromDTOtoEntity(sectorProduccionDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.sectorProduccionRepository.save(entity);
        return SectorProduccionMapper.fromEntityToDTO(result);
    }

    async update(sectorProduccionDTO: SectorProduccionDTO, updater?: string): Promise<SectorProduccionDTO | undefined> {
        const entity = SectorProduccionMapper.fromDTOtoEntity(sectorProduccionDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.sectorProduccionRepository.save(entity);
        return SectorProduccionMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.sectorProduccionRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
