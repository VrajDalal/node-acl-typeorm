import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CategoryItem } from "./category.entity";
import { UploadItem } from "./uploadPost.entity";
import { User } from "./user.entity";


@Entity()
export class PostItem {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    short_description: string

    @Column()
    detail: string

    @Column()
    likes: number

    @Column()
    views: number

    @Column()
    shares: number

    @CreateDateColumn()
    is_published: Date

    @DeleteDateColumn()
    is_deleted: Date

    @ManyToOne(() => User)
    users: User

    @ManyToOne(() => UploadItem)
    image: UploadItem

    @ManyToOne(() => CategoryItem)
    category: CategoryItem
}