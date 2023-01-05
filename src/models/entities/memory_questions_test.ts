import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import Memory_question from './memory_questions'
import Test from './tests'

@Table({
  tableName: 'memory_questions_tests',
})
export default class Memory_question_test extends Model<Memory_question_test> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  }
  )
  id!: string

  @Column
  @ForeignKey(() => Memory_question)
  @Column({
    allowNull: false,
    field: 'memory_question_test'
  })
  memory_question_id!: string

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

  @Column
  isShowedData!: boolean 

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

