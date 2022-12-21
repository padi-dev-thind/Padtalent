export interface BaseRepositoryInterface {
  findById(id: number): Promise<any>;
  getAll(object: any): Promise<any[]>;
  getAllAndCount(): Promise<{ rows: any[]; count: number }>;
  findByCondition(args: object): Promise<any>;
  findOrCreateByCondition(args: object): Promise<any>;
}
