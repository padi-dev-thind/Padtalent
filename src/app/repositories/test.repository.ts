import Test from '@models/entities/tests'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { TestRepositoryInterface } from './interfaces/test.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'

@Service({ global: true })
class TestRepository extends BaseRepository<Test> implements  TestRepositoryInterface<Test> {
  constructor(@ModelContainer(Test.tableName) Test: ModelCtor<Test>) {
    super(Test)
  }
}

export default TestRepository
