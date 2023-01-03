import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'hrs',
})
export default class Hr extends Model<Hr> {
  
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  }
  )
  id!: string

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

  @Column
  password!: string

  @Column
  is_admin!: boolean

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
