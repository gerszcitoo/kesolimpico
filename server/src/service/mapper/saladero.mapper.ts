import { Saladero } from '../../domain/saladero.entity';
import { SaladeroDTO } from '../dto/saladero.dto';

/**
 * A Saladero mapper object.
 */
export class SaladeroMapper {
    static fromDTOtoEntity(entityDTO: SaladeroDTO): Saladero {
        if (!entityDTO) {
            return;
        }
        const entity = new Saladero();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Saladero): SaladeroDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new SaladeroDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
