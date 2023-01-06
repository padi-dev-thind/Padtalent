import { AutoIncrement, BelongsTo, BelongsToMany, Column, CreatedAt, DeletedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import Assessment from './assessments'
import Assessment_game_type from './assessments_game_types'
import Hr from './hrs'
import Hrs_game_type from './hrs_game_types'

@Table({
  tableName: 'game_types',
})
export default class Game_type extends Model<Game_type> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  type!: string

  @Column
  total_time!: number

  @Column
  description!: string

  @BelongsToMany(() => Hr, {
    through: { model: () => Hrs_game_type },
  })
  hr!: Hr[]

  @BelongsToMany(() => Assessment, {
    through: { model: () => Assessment_game_type },
  })
  assessment!: Assessment[]

  @CreatedAt
  @Column
  created_at!: Date

  @UpdatedAt
  @Column
  updated_at!: Date

  @DeletedAt
  @Column
  deleted_at!: Date
}
