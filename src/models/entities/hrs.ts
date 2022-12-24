import { JSONType } from 'aws-sdk/clients/s3'
import { Column, CreatedAt, DataType, Model, PrimaryKey, Sequelize, Table, UpdatedAt } from 'sequelize-typescript'
import { Json } from 'sequelize/types/utils'


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
  logo!: string

  @Column
  email!: string

  @Column
  role!: string

  @Column
  company!: string

  @Column
  company_industry!: string

  @Column
  company_size!: string

  @Column({
    type: DataType.JSON
  })
  password!: string

  @Column
  is_admin!: boolean


  @CreatedAt
  @Column
  created_at!: Date

  @UpdatedAt
  @Column
  updated_at!: Date
}
