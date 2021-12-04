import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { SectorCuradoDTO } from '../service/dto/sector-curado.dto';
import { SectorCuradoMapper } from '../service/mapper/sector-curado.mapper';
import { SectorCuradoRepository } from '../repository/sector-curado.repository';

const relationshipNames = [];

@Injectable()
export class SectorCuradoService {
    logger = new Logger('SectorCuradoService');

    constructor(@InjectRepository(SectorCuradoRepository) private sectorCuradoRepository: SectorCuradoRepository) {}

    async findById(id: number): Promise<SectorCuradoDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.sectorCuradoRepository.findOne(id, options);
        return SectorCuradoMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<SectorCuradoDTO>): Promise<SectorCuradoDTO | undefined> {
        const result = await this.sectorCuradoRepository.findOne(options);
        return SectorCuradoMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<SectorCuradoDTO>): Promise<[SectorCuradoDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.sectorCuradoRepository.findAndCount(options);
        const sectorCuradoDTO: SectorCuradoDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(sectorCurado =>
                sectorCuradoDTO.push(SectorCuradoMapper.fromEntityToDTO(sectorCurado)),
            );
            resultList[0] = sectorCuradoDTO;
        }
        return resultList;
    }

    async save(sectorCuradoDTO: SectorCuradoDTO, creator?: string): Promise<SectorCuradoDTO | undefined> {
        const entity = SectorCuradoMapper.fromDTOtoEntity(sectorCuradoDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.sectorCuradoRepository.save(entity);
        return SectorCuradoMapper.fromEntityToDTO(result);
    }

    async update(sectorCuradoDTO: SectorCuradoDTO, updater?: string): Promise<SectorCuradoDTO | undefined> {
        const entity = SectorCuradoMapper.fromDTOtoEntity(sectorCuradoDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.sectorCuradoRepository.save(entity);
        return SectorCuradoMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.sectorCuradoRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
