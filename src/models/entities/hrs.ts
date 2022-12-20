import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'hrs',
})
export default class Hr extends Model<Hr> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  name!: string

  @Column
  password!: string

  @Column
  isAdmin!: boolean


  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
