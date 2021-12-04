/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

/**
 * A SectorCuradoDTO object.
 */
export class SectorCuradoDTO extends BaseDTO {
    @ApiModelProperty({ description: 'fechaEnt field', required: false })
    fechaEnt: any;

    @ApiModelProperty({ description: 'fechaSal field', required: false })
    fechaSal: any;

    @ApiModelProperty({ description: 'temperatura field', required: false })
    temperatura: number;

    @Min(1)
    @Max(10)
    @ApiModelProperty({ description: 'calidad field', required: false })
    calidad: number;

    @ApiModelProperty({ description: 'humedad field', required: false })
    humedad: number;

    @ApiModelProperty({ description: 'co2 field', required: false })
    co2: number;

    @ApiModelProperty({ description: 'pesoEnt field', required: false })
    pesoEnt: number;

    @ApiModelProperty({ description: 'pesoSal field', required: false })
    pesoSal: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
