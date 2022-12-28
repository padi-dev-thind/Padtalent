import { AutoIncrement, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import Logical_question from './logical_questions'
import Test from './tests'

@Table({
  tableName: 'logical_questions_tests',
})
export default class Logical_question_test extends Model<Logical_question_test> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  @ForeignKey(() => Logical_question)
  @Column({
    allowNull: false,
    field: 'logical_question_id'
  })
  logical_question_id!: number

  @ForeignKey(() => Test)
  @Column({
    allowNull: false,
    field: 'test_id'
  })
  test_id!: number

  @Column
  candidate_answer!: string

  @Column
  status!: string

  @Column
  question_number!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
