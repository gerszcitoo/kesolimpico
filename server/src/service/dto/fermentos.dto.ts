/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, MaxLength, Length, Min, Max, Matches } from 'class-validator';
import { BaseDTO } from './base.dto';

import { SectorProduccionDTO } from './sector-produccion.dto';

/**
 * A FermentosDTO object.
 */
export class FermentosDTO extends BaseDTO {
    @ApiModelProperty({ description: 'fecha field', required: false })
    fecha: any;

    @ApiModelProperty({ description: 'peso field', required: false })
    peso: number;

    @Min(1)
    @Max(10)
    @ApiModelProperty({ description: 'calidad field', required: false })
    calidad: number;

    @ApiModelProperty({ description: 'detalle field', required: false })
    detalle: string;

    @ApiModelProperty({ description: 'tipoQueso field', required: false })
    tipoQueso: string;

    @ApiModelProperty({ type: SectorProduccionDTO, isArray: true, description: 'sectorProduccions relationship' })
    sectorProduccions: SectorProduccionDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
