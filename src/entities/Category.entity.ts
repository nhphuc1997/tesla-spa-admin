import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Base } from "./Base.entity.js";
import { Product } from "./Product.entity.js";
import { OptionColor } from "./Technical.entity.js";
import { OptionWheel } from "./OptionWheel.entity.js";
import { OptionInterator } from "./OptionInterator.entity.js";

@Entity('category')
export class Category extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}