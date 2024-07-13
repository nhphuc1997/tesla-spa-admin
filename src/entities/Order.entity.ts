import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Base } from "./Base.entity.js";
import { Product } from "./Product.entity.js";
import { OptionColor } from "./Technical.entity.js";
import { OptionWheel } from "./OptionWheel.entity.js";
import { OptionInterator } from "./OptionInterator.entity.js";

@Entity('order')
export class Order extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  orderId: string

  @Column()
  userId: string

  @Column()
  phoneNumber: string

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Relation<Product>

  @Column()
  productId: Relation<Product>
}
