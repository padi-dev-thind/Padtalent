import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'game_types',
})
export default class Game_type extends Model<Game_type> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  type!: string

  @Column
  total_time!: number

  @CreatedAt
  @Column
  created_at!: Date

  @UpdatedAt
  @Column
  updated_at!: Date
}
