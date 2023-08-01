import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Events extends BaseEntity {
  @PrimaryGeneratedColumn()
  "id": number;

  @Column()
  "category": string;

  @Column()
  "city": string;

  @Column()
  "country": string;

  @Column()
  "title": string;

  @Column({
    type: "varchar",
    unique: true
  })
  "url": string;

  @Column()
  "description": string;

  @Column()
  "imgSrc": string;

  @Column()
  "eventDate": string;

}