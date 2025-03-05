import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({nullable: true})
    desc: string;

    @Column({default: 'pending'})
    status: string;

    @CreateDateColumn()
    createdAt: Date;
}