/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Saladero.
 */
@Entity('saladero')
export class Saladero extends BaseEntity {
    @Column({ type: 'datetime', name: 'fecha_ent', nullable: true })
    fechaEnt: any;

    @Column({ type: 'datetime', name: 'fecha_sal', nullable: true })
    fechaSal: any;

    @Column({ type: 'integer', name: 'peso', nullable: true })
    peso: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
