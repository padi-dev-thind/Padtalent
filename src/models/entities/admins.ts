import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'admins',
})
export default class Admin extends Model<Admin> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  name!: string

  @Column
  password!: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
