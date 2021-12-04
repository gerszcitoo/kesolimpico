/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A AlmacenDTO object.
 */
export class AlmacenDTO extends BaseDTO {
    @Min(1)
    @Max(10)
    @ApiModelProperty({ description: 'estado field', required: false })
    estado: number;

    @ApiModelProperty({ description: 'fechaEnt field', required: false })
    fechaEnt: any;

    @ApiModelProperty({ description: 'fechaSal field', required: false })
    fechaSal: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
