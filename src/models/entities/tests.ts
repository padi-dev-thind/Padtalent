import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'tests',
})
export default class Test extends Model<Test> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  game_type_id!: number

  @Column
  candidate_id!: number
  
  @Column
  assessment_id!: number

  @Column
  result!: number

  @Column
  start_time!: Date

  @Column
  end_time!: Date

  @CreatedAt
  @Column
  created_at!: Date

  @UpdatedAt
  @Column
  updated_at!: Date
}
