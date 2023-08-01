import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column({
    type: "varchar",
    unique: true
  })
  "name": string;
}