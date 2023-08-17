import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    is_published: boolean

    @Column()
    is_deleted: boolean

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => UploadItem)
    image: UploadItem

    @ManyToOne(() => CategoryItem)
    category: CategoryItem
}