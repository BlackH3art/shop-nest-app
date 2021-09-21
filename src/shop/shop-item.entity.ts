import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ShopItem {

  // automatyczne generowanie nieprzeiwdywalnych ID
  // przekazać 'uuid' do dekoratora @PrimaryGeneratedColumn
  // wówczas ID jest stringiem nie numerem. 
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 30
  })
  name: string;

  @Column({
    length: 30
  })
  category: string;

  @Column({
    length: 150,
    default: null,
    nullable: true
  })
  description: string | null;

  @Column({
    type: "float",
    precision: 6,
    scale: 2
  })
  price: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date

  @Column({
    default: 0,
  })
  boughtCount: number;

  @Column({
    default: false
  })
  wasEverBought: boolean
}