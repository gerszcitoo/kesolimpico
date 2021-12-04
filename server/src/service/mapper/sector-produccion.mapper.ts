import { SectorProduccion } from '../../domain/sector-produccion.entity';
import { SectorProduccionDTO } from '../dto/sector-produccion.dto';

/**
 * A SectorProduccion mapper object.
 */
export class SectorProduccionMapper {
    static fromDTOtoEntity(entityDTO: SectorProduccionDTO): SectorProduccion {
        if (!entityDTO) {
            return;
        }
        const entity = new SectorProduccion();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: SectorProduccion): SectorProduccionDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new SectorProduccionDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
