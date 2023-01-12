import Candidates_assessments from '@models/entities/candidates_assessments';
import { Service } from 'typedi';
import { ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from './base.repository';
import { Candidates_assessmentsRepositoryInterface } from './interfaces/candidates_assessments.repository.interface';
import { ModelContainer } from '@decorators/model.decorator';

@Service({ global: true })
class Candidates_assessmentsRepository
    extends BaseRepository<Candidates_assessments>
    implements Candidates_assessmentsRepositoryInterface<Candidates_assessments>
{
    constructor(
        @ModelContainer(Candidates_assessments.tableName)
        Candidates_assessments: ModelCtor<Candidates_assessments>,
    ) {
        super(Candidates_assessments);
    }
}
export default Candidates_assessmentsRepository;
