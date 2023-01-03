import { AutoIncrement, Column, CreatedAt, DataType, DeletedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'logical_questions',
})
export default class Logical_question extends Model<Logical_question> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  }
  )
  id!: string

  @Column
  statement1!: string

  @Column
  statement2!: string

  @Column
  answer!: string

  @Column
  conclusion!: string

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
