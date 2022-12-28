import { AutoIncrement, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import Memory_question from './memory_questions'
import Test from './tests'

@Table({
  tableName: 'memory_questions_tests',
})
export default class Memory_question_test extends Model<Memory_question_test> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  @ForeignKey(() => Memory_question)
  @Column({
    allowNull: false,
    field: 'memory_question_test'
  })
  memory_question_id!: number

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
  created_at!: Date

  @UpdatedAt
  @Column
  updated_at!: Date
}

