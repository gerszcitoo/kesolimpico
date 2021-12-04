/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A SectorCurado.
 */
@Entity('sector_curado')
export class SectorCurado extends BaseEntity {
    @Column({ type: 'datetime', name: 'fecha_ent', nullable: true })
    fechaEnt: any;

    @Column({ type: 'datetime', name: 'fecha_sal', nullable: true })
    fechaSal: any;

    @Column({ type: 'integer', name: 'temperatura', nullable: true })
    temperatura: number;

    @Column({ type: 'integer', name: 'calidad', nullable: true })
    calidad: number;

    @Column({ type: 'integer', name: 'humedad', nullable: true })
    humedad: number;

    @Column({ type: 'integer', name: 'co_2', nullable: true })
    co2: number;

    @Column({ type: 'integer', name: 'peso_ent', nullable: true })
    pesoEnt: number;

    @Column({ type: 'integer', name: 'peso_sal', nullable: true })
    pesoSal: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
