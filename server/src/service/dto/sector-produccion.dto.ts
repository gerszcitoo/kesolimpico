/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { FermentosDTO } from './fermentos.dto';
import { RecepcionDTO } from './recepcion.dto';

/**
 * A SectorProduccionDTO object.
 */
export class SectorProduccionDTO extends BaseDTO {
    @ApiModelProperty({ description: 'peso field', required: false })
    peso: number;

    @ApiModelProperty({ type: FermentosDTO, description: 'fermentos relationship' })
    fermentos: FermentosDTO;

    @ApiModelProperty({ type: RecepcionDTO, description: 'recepcion relationship' })
    recepcion: RecepcionDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
