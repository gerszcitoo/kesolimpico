import { SectorCurado } from '../../domain/sector-curado.entity';
import { SectorCuradoDTO } from '../dto/sector-curado.dto';

/**
 * A SectorCurado mapper object.
 */
export class SectorCuradoMapper {
    static fromDTOtoEntity(entityDTO: SectorCuradoDTO): SectorCurado {
        if (!entityDTO) {
            return;
        }
        const entity = new SectorCurado();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: SectorCurado): SectorCuradoDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new SectorCuradoDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
