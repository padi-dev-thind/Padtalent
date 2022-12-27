import { Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import Assessment from './assessments'
import Candidate from './candidates'

@Table({
  tableName: 'candidates_assessments',
})
export default class Candidate_assessment extends Model<Candidate_assessment> {

  @PrimaryKey
  @Column
  id!: number

  @Column
  @ForeignKey(() => Assessment)
  @Column({
    allowNull: false,
    field: 'assessment_id'
  })
  assessment_id!: number

  @ForeignKey(() => Candidate)
  @Column({
    allowNull: false,
    field: 'game_type_id'
  })
  @Column
  game_type_id!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}
