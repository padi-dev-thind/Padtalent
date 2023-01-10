import Candidate from '@models/entities/candidates';
import { Service } from 'typedi';
import { ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from './base.repository';
import { CandidateRepositoryInterface } from './interfaces/candidate.repository.interface';
import { ModelContainer } from '@decorators/model.decorator';

@Service({ global: true })
class CandidateRepository
  extends BaseRepository<Candidate>
  implements CandidateRepositoryInterface<Candidate>
{
  constructor(@ModelContainer(Candidate.tableName) Candidate: ModelCtor<Candidate>) {
    super(Candidate);
  }

  async findByEmail(email: string): Promise<Candidate> {
    return this.findByCondition({
      where: { email: email },
      raw: true,
    });
  }
}
export default CandidateRepository;
