import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'assessments',
})
export default class Assessment extends Model<Assessment> {
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
