import Hr from '@models/entities/hrs'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { HrRepositoryInterface } from './interfaces/hr.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'

@Service({ global: true })
class HrRepository extends BaseRepository<Hr> implements HrRepositoryInterface<Hr> {
  constructor(@ModelContainer(Hr.tableName) Hr: ModelCtor<Hr>) {
    super(Hr)
  }

  async findByName(name: string): Promise<Hr> {
    return this.findByCondition({
      where: { name: name },
    })
  }
}
export default HrRepository
