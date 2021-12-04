/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Almacen.
 */
@Entity('almacen')
export class Almacen extends BaseEntity {
    @Column({ type: 'integer', name: 'estado', nullable: true })
    estado: number;

    @Column({ type: 'datetime', name: 'fecha_ent', nullable: true })
    fechaEnt: any;

    @Column({ type: 'datetime', name: 'fecha_sal', nullable: true })
    fechaSal: any;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
