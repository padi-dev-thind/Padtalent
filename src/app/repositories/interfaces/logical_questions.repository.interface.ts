import { Model } from 'sequelize';
import { BaseRepositoryInterface } from './base.repository.interface';

export interface Logical_questionsRepositoryInterface<M extends Model>
  extends BaseRepositoryInterface {}
