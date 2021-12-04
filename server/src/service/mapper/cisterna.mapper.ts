import { Cisterna } from '../../domain/cisterna.entity';
import { CisternaDTO } from '../dto/cisterna.dto';

/**
 * A Cisterna mapper object.
 */
export class CisternaMapper {
    static fromDTOtoEntity(entityDTO: CisternaDTO): Cisterna {
        if (!entityDTO) {
            return;
        }
        const entity = new Cisterna();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Cisterna): CisternaDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new CisternaDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
