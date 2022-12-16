import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'logical_questions',
})
export default class Logical_question extends Model<Logical_question> {
  @PrimaryKey
  @Column
  id!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
