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
import Game_type from './game_types';

@Table({
    tableName: 'assessments_game_types',
})
export default class Assessment_game_type extends Model<Assessment_game_type> {
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

    @ForeignKey(() => Game_type)
    @Column({
        allowNull: false,
        field: 'game_type_id',
    })
    @Column
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
