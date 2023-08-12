import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

    // @ManyToMany(() => CategoryItem)
    // category: CategoryItem
}