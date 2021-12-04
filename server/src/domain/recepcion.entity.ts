/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { SectorProduccion } from './sector-produccion.entity';

/**
 * A Recepcion.
 */
@Entity('recepcion')
export class Recepcion extends BaseEntity {
    @Column({ type: 'datetime', name: 'fecha', nullable: true })
    fecha: any;

    @Column({ type: 'integer', name: 'calidad', nullable: true })
    calidad: number;

    @Column({ type: 'integer', name: 'cantidad', nullable: true })
    cantidad: number;

    @Column({ name: 'analisis', nullable: true })
    analisis: string;

    @Column({ name: 'tambo', nullable: true })
    tambo: string;

    @Column({ type: 'integer', name: 'temperatura', nullable: true })
    temperatura: number;

    @OneToMany(
        type => SectorProduccion,
        other => other.recepcion,
    )
    sectorProduccions: SectorProduccion[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
