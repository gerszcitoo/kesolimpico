/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { SectorProduccionDTO } from './sector-produccion.dto';

/**
 * A RecepcionDTO object.
 */
export class RecepcionDTO extends BaseDTO {
    @ApiModelProperty({ description: 'fecha field', required: false })
    fecha: any;

    @Min(1)
    @Max(10)
    @ApiModelProperty({ description: 'calidad field', required: false })
    calidad: number;

    @ApiModelProperty({ description: 'cantidad field', required: false })
    cantidad: number;

    @ApiModelProperty({ description: 'analisis field', required: false })
    analisis: string;

    @ApiModelProperty({ description: 'tambo field', required: false })
    tambo: string;

    @ApiModelProperty({ description: 'temperatura field', required: false })
    temperatura: number;

    @ApiModelProperty({ type: SectorProduccionDTO, isArray: true, description: 'sectorProduccions relationship' })
    sectorProduccions: SectorProduccionDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
