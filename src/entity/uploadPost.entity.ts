import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryItem } from "./category.entity";

@Entity()
export class UploadItem {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 100 })
    file_name: string

    @Column({ type: 'varchar', length: 100 })
    path: string

    @Column({ type: 'varchar', length: 100 })
    size: string

    @Column({ type: 'varchar', length: 100 })
    extension: string

    // @OneToMany(() => CategoryItem,category => category.id,{
    //     onDelete: 'CASCADE'
    // })
    // category: CategoryItem
}