import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AlmacenDTO } from '../service/dto/almacen.dto';
import { AlmacenMapper } from '../service/mapper/almacen.mapper';
import { AlmacenRepository } from '../repository/almacen.repository';

const relationshipNames = [];

@Injectable()
export class AlmacenService {
    logger = new Logger('AlmacenService');

    constructor(@InjectRepository(AlmacenRepository) private almacenRepository: AlmacenRepository) {}

    async findById(id: number): Promise<AlmacenDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.almacenRepository.findOne(id, options);
        return AlmacenMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<AlmacenDTO>): Promise<AlmacenDTO | undefined> {
        const result = await this.almacenRepository.findOne(options);
        return AlmacenMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<AlmacenDTO>): Promise<[AlmacenDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.almacenRepository.findAndCount(options);
        const almacenDTO: AlmacenDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(almacen => almacenDTO.push(AlmacenMapper.fromEntityToDTO(almacen)));
            resultList[0] = almacenDTO;
        }
        return resultList;
    }

    async save(almacenDTO: AlmacenDTO, creator?: string): Promise<AlmacenDTO | undefined> {
        const entity = AlmacenMapper.fromDTOtoEntity(almacenDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.almacenRepository.save(entity);
        return AlmacenMapper.fromEntityToDTO(result);
    }

    async update(almacenDTO: AlmacenDTO, updater?: string): Promise<AlmacenDTO | undefined> {
        const entity = AlmacenMapper.fromDTOtoEntity(almacenDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.almacenRepository.save(entity);
        return AlmacenMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.almacenRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
