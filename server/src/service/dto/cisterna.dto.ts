/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A CisternaDTO object.
 */
export class CisternaDTO extends BaseDTO {
    @ApiModelProperty({ description: 'estado field', required: false })
    estado: string;

    @ApiModelProperty({ description: 'volumen field', required: false })
    volumen: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
