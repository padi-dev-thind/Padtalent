import { Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import Assessment from './assessments';
import Game_type from './game_types';

@Table({
  tableName: 'assessments_game_types',
})
export default class Assessment_game_type extends Model<Assessment_game_type> {
  
  @PrimaryKey
  @Column
  id!: number

  @Column
  assessment_id!: number

  // @ForeignKey(() => Game_type)
  // @Column({
  //   allowNull: false,
  //   field: 'game_type_id'
  // })
  @Column
  game_type_id!: number

  @CreatedAt
  @Column
  created_at!: Date

  @UpdatedAt
  @Column
  updated_at!: Date

  @Column
  deledatedAt!: Date
}
