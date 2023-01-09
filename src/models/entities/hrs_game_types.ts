import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import Game_type from './game_types';
import Hr from './hrs';

@Table({
  tableName: 'hrs_game_types',
})
export default class Hrs_game_type extends Model<Hrs_game_type> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Hr)
  @Column({
    allowNull: false,
    field: 'hr_id',
  })
  hr_id!: string;

  @ForeignKey(() => Game_type)
  @Column({
    allowNull: false,
    field: 'game_type_id',
  })
  game_type_id!: number;

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
