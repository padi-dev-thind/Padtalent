import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt, AutoIncrement } from 'sequelize-typescript'

@Table({
  tableName: 'tests',
})
export default class Test extends Model<Test> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  game_type_id!: number

  @Column
  candidate_id!: number
  
  @Column
  assessment_id!: number

  @Column
  total_time!: number

  @Column
  remaining_time!: number

  @Column
  status!: string

  @Column
  result!: number

  @Column
  number_of_questions!: number

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
