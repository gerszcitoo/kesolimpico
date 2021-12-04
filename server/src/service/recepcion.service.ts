import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { RecepcionDTO } from '../service/dto/recepcion.dto';
import { RecepcionMapper } from '../service/mapper/recepcion.mapper';
import { RecepcionRepository } from '../repository/recepcion.repository';

const relationshipNames = [];

@Injectable()
export class RecepcionService {
    logger = new Logger('RecepcionService');

    constructor(@InjectRepository(RecepcionRepository) private recepcionRepository: RecepcionRepository) {}

    async findById(id: number): Promise<RecepcionDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.recepcionRepository.findOne(id, options);
        return RecepcionMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<RecepcionDTO>): Promise<RecepcionDTO | undefined> {
        const result = await this.recepcionRepository.findOne(options);
        return RecepcionMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<RecepcionDTO>): Promise<[RecepcionDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.recepcionRepository.findAndCount(options);
        const recepcionDTO: RecepcionDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(recepcion => recepcionDTO.push(RecepcionMapper.fromEntityToDTO(recepcion)));
            resultList[0] = recepcionDTO;
        }
        return resultList;
    }

    async save(recepcionDTO: RecepcionDTO, creator?: string): Promise<RecepcionDTO | undefined> {
        const entity = RecepcionMapper.fromDTOtoEntity(recepcionDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.recepcionRepository.save(entity);
        return RecepcionMapper.fromEntityToDTO(result);
    }

    async update(recepcionDTO: RecepcionDTO, updater?: string): Promise<RecepcionDTO | undefined> {
        const entity = RecepcionMapper.fromDTOtoEntity(recepcionDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.recepcionRepository.save(entity);
        return RecepcionMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.recepcionRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
