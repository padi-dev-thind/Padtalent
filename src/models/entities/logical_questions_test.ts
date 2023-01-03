import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import Logical_question from './logical_questions'
import Test from './tests'

@Table({
  tableName: 'logical_questions_tests',
})
export default class Logical_question_test extends Model<Logical_question_test> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  }
  )
  id!: string

  @Column
  @ForeignKey(() => Logical_question)
  @Column({
    allowNull: false,
    field: 'logical_question_id'
  })
  logical_question_id!: string

  @ForeignKey(() => Test)
  @Column({
    allowNull: false,
    field: 'test_id'
  })
  test_id!: string

  @Column
  candidate_answer!: string

  @Column
  status!: string

  @Column
  question_number!: number

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
