import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt, AutoIncrement, DataType, DeletedAt } from 'sequelize-typescript'

@Table({
  tableName: 'tests',
})
export default class Test extends Model<Test> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  }
  )
  id!: string

  @Column
  game_type_id!: number

  @Column
  candidate_id!: string
  
  @Column
  assessment_id!: string

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

  @DeletedAt
  @Column
  deleted_at!: Date
}
