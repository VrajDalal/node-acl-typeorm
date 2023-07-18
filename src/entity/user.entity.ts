import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { Roles } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", length: 100, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 100 })
    password!: string;

    @Column()
    mobile_no!: number;

    @ManyToMany(() => Roles)
    @JoinTable({ name: 'users_roles', joinColumns: [{ name: 'user_id' }], inverseJoinColumns: [{ name: 'role_id' }] })
    roles!: Roles[];
}

