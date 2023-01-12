import Test from '@models/entities/tests';
import { Service } from 'typedi';
import { ModelCtor } from 'sequelize-typescript';
import { BaseRepository } from './base.repository';
import { TestRepositoryInterface } from './interfaces/test.repository.interface';
import { ModelContainer } from '@decorators/model.decorator';

@Service({ global: true })
class TestRepository extends BaseRepository<Test> implements TestRepositoryInterface<Test> {
    constructor(@ModelContainer(Test.tableName) Test: ModelCtor<Test>) {
        super(Test);
    }
    async updateByCondition(object: Object, condition: any): Promise<any> {
        return this.model.update(object, condition);
    }

    async incrementResult(object: Object, condition: any): Promise<any> {
        return this.model.increment(object, condition);
    }
}

export default TestRepository;
