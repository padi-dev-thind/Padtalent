import Memory_questions from '@models/entities/memory_questions'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { Memory_questionsRepositoryInterface } from './interfaces/memory_questions.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'

@Service({ global: true })
class Memory_questionsRepository extends BaseRepository<Memory_questions> implements  Memory_questionsRepositoryInterface<Memory_questions> {
  constructor(@ModelContainer(Memory_questions.tableName) Memory_questions: ModelCtor<Memory_questions>) {
    super(Memory_questions)
  }
}

export default Memory_questionsRepository
