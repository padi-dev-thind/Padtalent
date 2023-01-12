import Memory_questions_tests from '@models/entities/memory_questions_test';
import { Service } from 'typedi';
import { ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from './base.repository';
import { Memory_questions_testsRepositoryInterface } from './interfaces/memory_questions_tests.repository.interface';
import { ModelContainer } from '@decorators/model.decorator';

@Service({ global: true })
class Memory_questions_testsRepository
    extends BaseRepository<Memory_questions_tests>
    implements Memory_questions_testsRepositoryInterface<Memory_questions_tests>
{
    constructor(
        @ModelContainer(Memory_questions_tests.tableName)
        Memory_questions_tests: ModelCtor<Memory_questions_tests>,
    ) {
        super(Memory_questions_tests);
    }
}

export default Memory_questions_testsRepository;
