import { Model } from 'sequelize';
import { BaseRepositoryInterface } from './base.repository.interface';

export interface TestRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  update(object: Object, condition: any): Promise<any[]>;
  incrementResult(object: Object, condition: any): Promise<any>;
}
