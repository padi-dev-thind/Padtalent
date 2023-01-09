import Logical_questions from '@models/entities/logical_questions';
import { Service } from 'typedi';
import { ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from './base.repository';
import { Logical_questionsRepositoryInterface } from './interfaces/logical_questions.repository.interface';
import { ModelContainer } from '@decorators/model.decorator';

@Service({ global: true })
class Logical_questionsRepository
  extends BaseRepository<Logical_questions>
  implements Logical_questionsRepositoryInterface<Logical_questions>
{
  constructor(
    @ModelContainer(Logical_questions.tableName)
    Logical_questions: ModelCtor<Logical_questions>,
  ) {
    super(Logical_questions);
  }
}

export default Logical_questionsRepository;
