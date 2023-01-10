import { isEmail } from 'class-validator';
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  IsEmail
} from 'sequelize-typescript';
import Assessment from './assessments';
import Candidate_assessment from './candidates_assessments';

@Table({
  tableName: 'candidates',
})
export default class Candidate extends Model<Candidate> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @IsEmail
  @Column
  email!: string;

  @BelongsToMany(() => Assessment, {
    through: { model: () => Candidate_assessment },
  })
  candidate!: Candidate[];

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
