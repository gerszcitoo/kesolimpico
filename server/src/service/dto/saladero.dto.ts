/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A SaladeroDTO object.
 */
export class SaladeroDTO extends BaseDTO {
    @ApiModelProperty({ description: 'fechaEnt field', required: false })
    fechaEnt: any;

    @ApiModelProperty({ description: 'fechaSal field', required: false })
    fechaSal: any;

    @ApiModelProperty({ description: 'peso field', required: false })
    peso: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
