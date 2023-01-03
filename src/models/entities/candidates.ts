import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'candidates',
})
export default class Candidate extends Model<Candidate> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  }
  )
  id!: string

  @Column
  email!: string

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

