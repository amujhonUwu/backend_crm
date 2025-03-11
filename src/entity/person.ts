import {
    Entity,
    PrimaryGeneratedColumn,
    Column
  } from 'typeorm';
  
  export type Gender = 'Masculino' | 'Femenino' | 'Otro';
  export type DocumentType = 'DNI' | 'Pasaporte' | 'Otro';
  export type MaritalStatus = 'Soltero' | 'Casado' | 'Divorciado' | 'Viudo';

@Entity('person')
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', unique: true })
  public_id!: string;

  @Column({ type: 'varchar', length: 100 })
  first_name!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  middle_name?: string;

  @Column({ type: 'varchar', length: 100 })
  last_name1!: string;

  @Column({ type: 'varchar', length: 100 })
  last_name2!: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: Date;

  @Column({ type: 'enum', enum: ['Masculino', 'Femenino', 'Otro'], default: 'Otro' })
  gender!: Gender;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'enum', enum: ['DNI', 'Pasaporte', 'Otro'], default: 'DNI' })
  document_type!: DocumentType;

  @Column({ type: 'varchar', length: 50, nullable: true })
  document_number?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nationality?: string;

  @Column({ type: 'enum', enum: ['Soltero', 'Casado', 'Divorciado', 'Viudo'], nullable: true })
  marital_status?: MaritalStatus;
}

