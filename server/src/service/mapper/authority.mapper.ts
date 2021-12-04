import { Authority } from '../../domain/authority.entity';
import { AuthorityDTO } from '../dto/authority.dto';

/**
 * A Authority mapper object.
 */
export class AuthorityMapper {
    static fromDTOtoEntity(entityDTO: AuthorityDTO): Authority {
        if (!entityDTO) {
            return;
        }
        const entity = new Authority();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Authority): AuthorityDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new AuthorityDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
