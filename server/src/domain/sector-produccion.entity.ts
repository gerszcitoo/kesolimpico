/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Fermentos } from './fermentos.entity';
import { Recepcion } from './recepcion.entity';

/**
 * A SectorProduccion.
 */
@Entity('sector_produccion')
export class SectorProduccion extends BaseEntity {
    @Column({ type: 'integer', name: 'peso', nullable: true })
    peso: number;

    @ManyToOne(type => Fermentos)
    fermentos: Fermentos;

    @ManyToOne(type => Recepcion)
    recepcion: Recepcion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
