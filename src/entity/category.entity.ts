import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UploadItem } from "./uploadPost.entity";

@Entity()
export class CategoryItem {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @ManyToOne(() => UploadItem)
    icon: UploadItem[]
}