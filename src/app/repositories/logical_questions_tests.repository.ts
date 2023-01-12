import Logical_questions_tests from '@models/entities/logical_questions_test';
import { Service } from 'typedi';
import { ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from './base.repository';
import { Logical_questions_testsRepositoryInterface } from './interfaces/logical_questions_tests.repository.interface';
import { ModelContainer } from '@decorators/model.decorator';

@Service({ global: true })
class Logical_questions_testsRepository
    extends BaseRepository<Logical_questions_tests>
    implements Logical_questions_testsRepositoryInterface<Logical_questions_tests>
{
    constructor(
        @ModelContainer(Logical_questions_tests.tableName)
        Logical_questions_tests: ModelCtor<Logical_questions_tests>,
    ) {
        super(Logical_questions_tests);
    }
}

export default Logical_questions_testsRepository;
