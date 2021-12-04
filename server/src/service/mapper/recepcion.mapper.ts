import { Recepcion } from '../../domain/recepcion.entity';
import { RecepcionDTO } from '../dto/recepcion.dto';

/**
 * A Recepcion mapper object.
 */
export class RecepcionMapper {
    static fromDTOtoEntity(entityDTO: RecepcionDTO): Recepcion {
        if (!entityDTO) {
            return;
        }
        const entity = new Recepcion();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Recepcion): RecepcionDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new RecepcionDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
