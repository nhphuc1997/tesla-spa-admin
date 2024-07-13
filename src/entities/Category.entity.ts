import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Base } from "./Base.entity.js";
import { Technical } from "./Technical.entity.js";
import { Material } from "./Material.entity.js";
import { Exterior } from "./Exterior.entity.js";
import { Interior } from "./Interior.entity.js";

@Entity('category')
export class Category extends Base {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Technical, tech => tech, { eager: true })
  @JoinColumn()
  technical: Relation<Technical>

  @Column()
  technicalId: Relation<Technical>

  @Column()
  materialId: Relation<Material>

  @Column()
  exteriorId: Relation<Exterior>

  @Column()
  interiorId: Relation<Interior>
}