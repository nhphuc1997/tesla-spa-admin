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

  @OneToMany(() => Material, material => material, { eager: true })
  @JoinColumn()
  material: Relation<Material>

  @Column()
  materialId: Relation<Material>

  @OneToMany(() => Exterior, exterior => exterior, { eager: true })
  @JoinColumn()
  exterior: Relation<Exterior>

  @Column()
  exteriorId: Relation<Exterior>

  @OneToMany(() => Interior, interior => interior, { eager: true })
  @JoinColumn()
  interior: Relation<Interior>

  @Column()
  interiorId: Relation<Interior>
}