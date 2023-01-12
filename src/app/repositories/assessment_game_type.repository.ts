import Assessment_game_type from '@models/entities/assessments_game_types';
import { Service } from 'typedi';
import { ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from './base.repository';
import { Assessment_game_typeRepositoryInterface } from './interfaces/assessment_game_type.repository.interface';
import { ModelContainer } from '@decorators/model.decorator';

@Service({ global: true })
class Assessment_game_typeRepository
    extends BaseRepository<Assessment_game_type>
    implements Assessment_game_typeRepositoryInterface<Assessment_game_type>
{
    constructor(
        @ModelContainer(Assessment_game_type.tableName)
        Assessment_game_type: ModelCtor<Assessment_game_type>,
    ) {
        super(Assessment_game_type);
    }
}

export default Assessment_game_typeRepository;
