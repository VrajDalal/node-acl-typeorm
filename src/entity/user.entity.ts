import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, BeforeInsert } from 'typeorm';
import { Roles } from './role.entity';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', default: null })
  mobile_no: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Roles)
  roles: Roles[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  static async comparePassword(candidatePassword: string, hashedPassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword)
  }

  static signToken(userObject: any) {
    const jwtToken = jwt.sign({ userObject }, 'secretkey', { expiresIn: '60d' })
    const userData = {
      jwt: jwtToken,
      users: userObject
    }
    return userData
  }
}


