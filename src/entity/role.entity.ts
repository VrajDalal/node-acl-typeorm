import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";
import { Permissions } from "./permission.entity";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => Permissions)
    @JoinTable({ name: 'role_permission', joinColumns: [{ name: 'role_id' }], inverseJoinColumns: [{ name: 'permission_id' }] })
    permission!: Permissions;

}