import { Fermentos } from '../../domain/fermentos.entity';
import { FermentosDTO } from '../dto/fermentos.dto';

/**
 * A Fermentos mapper object.
 */
export class FermentosMapper {
    static fromDTOtoEntity(entityDTO: FermentosDTO): Fermentos {
        if (!entityDTO) {
            return;
        }
        const entity = new Fermentos();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Fermentos): FermentosDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new FermentosDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
