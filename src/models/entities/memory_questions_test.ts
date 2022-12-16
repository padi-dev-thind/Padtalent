import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'memory_question_test',
})
export default class Memory_question_test extends Model<Memory_question_test> {

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
