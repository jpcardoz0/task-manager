import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Task } from "src/task/task.entity";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @OneToMany(() => Task, (task) => task.user, { cascade: true })
    task: Task[]
}