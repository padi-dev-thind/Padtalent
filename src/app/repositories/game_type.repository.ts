import Game_type from '@models/entities/game_types';
import { Service } from 'typedi';
import { ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from './base.repository';
import { Game_typeRepositoryInterface } from './interfaces/game_type.repository.interface';
import { ModelContainer } from '@decorators/model.decorator';

@Service({ global: true })
class Game_typeRepository
    extends BaseRepository<Game_type>
    implements Game_typeRepositoryInterface<Game_type>
{
    constructor(@ModelContainer(Game_type.tableName) Game_type: ModelCtor<Game_type>) {
        super(Game_type);
    }
}

export default Game_typeRepository;
