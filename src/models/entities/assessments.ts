import { Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import Hr from '@models/entities/hrs'

@Table({
  tableName: 'assessments',
})
export default class Assessment extends Model<Assessment> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  hr_id!: number

  @Column
  name!: string

  @Column
  link!: string

  @Column
  start_date!: Date

  @Column
  end_date!: Date

  @CreatedAt
  @Column
  created_at!: Date

  @UpdatedAt
  @Column
  updated_at!: Date
}
