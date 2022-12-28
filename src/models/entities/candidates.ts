import { AutoIncrement, Column, CreatedAt, DataType, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'candidates',
})
export default class Candidate extends Model<Candidate> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  email!: string

  @CreatedAt
  @Column
  created_at!: Date

  @UpdatedAt
  @Column
  updated_at!: Date
}
