import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  AutoIncrement,
  DataType,
  DeletedAt,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Assessment from './assessments';
import Candidate from './candidates';
import Game_type from './game_types';

@Table({
  tableName: 'tests',
})
export default class Test extends Model<Test> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @BelongsTo(() => Assessment, 'assessment_id')
  assessment!: Assessment[];

  @ForeignKey(() => Game_type)
  @Column({
    allowNull: false,
    field: 'game_type_id',
  })
  @Column
  game_type_id!: number;

  @ForeignKey(() => Candidate)
  @Column({
    allowNull: false,
    field: 'candidate_id',
  })
  @Column
  candidate_id!: string;

  @ForeignKey(() => Assessment)
  @Column({
    allowNull: false,
    field: 'assessment_id',
  })
  @Column
  assessment_id!: string;

  @Column
  total_time!: number;

  @Column
  remaining_time!: number;

  @Column
  status!: string;

  @Column
  result!: number;

  @Column
  number_of_questions!: number;

  @Column
  start_time!: Date;

  @Column
  end_time!: Date;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;

  @DeletedAt
  @Column
  deleted_at!: Date;
}
