/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { SectorProduccion } from './sector-produccion.entity';

/**
 * A Fermentos.
 */
@Entity('fermentos')
export class Fermentos extends BaseEntity {
    @Column({ type: 'datetime', name: 'fecha', nullable: true })
    fecha: any;

    @Column({ type: 'integer', name: 'peso', nullable: true })
    peso: number;

    @Column({ type: 'integer', name: 'calidad', nullable: true })
    calidad: number;

    @Column({ name: 'detalle', nullable: true })
    detalle: string;

    @Column({ name: 'tipo_queso', nullable: true })
    tipoQueso: string;

    @OneToMany(
        type => SectorProduccion,
        other => other.fermentos,
    )
    sectorProduccions: SectorProduccion[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
