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
import Assessment from './assessments';
import Candidate from './candidates';

@Table({
    tableName: 'candidates_assessments',
})
export default class Candidate_assessment extends Model<Candidate_assessment> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id!: string;

    @Column
    @ForeignKey(() => Assessment)
    @Column({
        allowNull: false,
        field: 'assessment_id',
    })
    assessment_id!: string;

    @ForeignKey(() => Candidate)
    @Column({
        allowNull: false,
        field: 'candidate_id',
    })
    candidate_id: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    @DeletedAt
    @Column
    deleted_at!: Date;
}
