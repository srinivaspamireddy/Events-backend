import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "country": string;

  @Column({
    type: "varchar",
    unique: true
  })
  "name": string;
}