/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Cisterna.
 */
@Entity('cisterna')
export class Cisterna extends BaseEntity {
    @Column({ name: 'estado', nullable: true })
    estado: string;

    @Column({ type: 'integer', name: 'volumen', nullable: true })
    volumen: number;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
