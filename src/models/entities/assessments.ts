import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import Hr from '@models/entities/hrs';
import Game_type from './game_types';
import Candidate from './candidates';
import Assessment_game_type from './assessments_game_types';
import Candidate_assessment from './candidates_assessments';
import Test from './tests';

@Table({
  tableName: 'assessments',
})
export default class Assessment extends Model<Assessment> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Hr)
  @Column({
    validate: {
      notNull: { msg: '"hr_id" is required' },
      notEmpty: { msg: '"hr_id" is required' },
    },
    allowNull: false,
    field: 'hr_id',
  })
  hr_id!: string;

  @BelongsToMany(() => Game_type, {
    through: { model: () => Assessment_game_type },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  game_type!: Game_type[];

  @BelongsToMany(() => Candidate, {
    through: { model: () => Candidate_assessment },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  candidate!: Candidate[];

  @BelongsTo(() => Hr, 'hr_id')
  hr!: Hr[];

  @HasMany(() => Test, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    hooks: true,
  })
  test!: Test[];

  @Column
  name!: string;

  @Column
  is_archived!: boolean;

  @Column
  link!: string;

  @Column
  start_date!: Date;

  @Column
  end_date!: Date;

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
