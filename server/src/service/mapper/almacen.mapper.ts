import { Almacen } from '../../domain/almacen.entity';
import { AlmacenDTO } from '../dto/almacen.dto';

/**
 * A Almacen mapper object.
 */
export class AlmacenMapper {
    static fromDTOtoEntity(entityDTO: AlmacenDTO): Almacen {
        if (!entityDTO) {
            return;
        }
        const entity = new Almacen();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Almacen): AlmacenDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new AlmacenDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
