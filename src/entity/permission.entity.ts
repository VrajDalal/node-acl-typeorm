import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./role.entity";

@Entity()
export class Permissions {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 30 })
    name!: string;

    // @ManyToOne(() => Roles, roles => roles.permission)
    // role!: Roles;
}
