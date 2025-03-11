import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Person } from "./person"

export type UserRole = 'admin' | 'manager' | 'user';
export type UserStatus = 'active' | 'suspended' | 'pending';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'uuid', unique: true })
    public_id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    password_hash!: string;

    @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
    username?: string;

    @Column({ type: 'enum', enum: ['admin', 'manager', 'user'], default: 'user' })
    role!: UserRole;

    @Column({ type: 'enum', enum: ['active', 'suspended', 'pending'], default: 'pending' })
    status!: UserStatus;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at!: Date;

    @Column({ type: 'timestamp', nullable: true })
    last_login?: Date;

    @OneToOne(() => Person, { nullable: true })
    @JoinColumn({ name: 'person_id' })
    person?: Person;
}
