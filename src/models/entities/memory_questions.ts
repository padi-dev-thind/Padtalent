import { AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  tableName: 'memory_questions',
})
export default class Memory_question extends Model<Memory_question> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number

  @Column
  level!: number

  @Column
  data!: string

  @CreatedAt
  @Column
  created_at!: Date

  @UpdatedAt
  @Column
  updated_at!: Date
}
