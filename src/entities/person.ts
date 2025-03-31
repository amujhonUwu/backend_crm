import {
    Entity,
    PrimaryGeneratedColumn,
    Column
  } from 'typeorm';
  
  export type Gender = 'Masculino' | 'Femenino' | 'Otro';
  export type DocumentType = 'Cédula' | 'Pasaporte' | 'Otro';
  export type MaritalStatus = 'Soltero' | 'Casado' | 'Divorciado' | 'Viudo';

@Entity('person')
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'uuid', unique: true })
  public_id!: string;

  @Column({ type: 'varchar', length: 25 })
  first_name!: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  middle_name?: string;

  @Column({ type: 'varchar', length: 25 })
  last_name1!: string;

  @Column({ type: 'varchar', length: 25 })
  last_name2!: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: Date;

  @Column({ type: 'enum', enum: ['Masculino', 'Femenino', 'Otro'], default: 'Otro' })
  gender!: Gender;

  @Column({ type: 'varchar', length: 10, nullable: true })
  phone?: string;

  @Column({ type: 'enum', enum: ['Cédula', 'Pasaporte', 'Otro'], default: 'Cédula' })
  document_type!: DocumentType;

  @Column({ type: 'varchar', length: 30, unique: true, nullable: false})
  document_number!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  nationality?: string;

  @Column({ type: 'enum', enum: ['Soltero', 'Casado', 'Divorciado', 'Viudo'], nullable: true })
  marital_status?: MaritalStatus;
}
