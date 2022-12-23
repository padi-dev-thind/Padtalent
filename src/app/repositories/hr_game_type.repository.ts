import Hr_game_type from '@models/entities/hrs_game_types'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { Hr_game_typeRepositoryInterface } from './interfaces/hr_game_type.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'

@Service({ global: true })
class Hr_game_typeRepository extends BaseRepository<Hr_game_type> implements  Hr_game_typeRepositoryInterface<Hr_game_type> {
  constructor(@ModelContainer(Hr_game_type.tableName) Hr_game_type: ModelCtor<Hr_game_type>) {
    super(Hr_game_type)
  }
}

export default Hr_game_typeRepository
