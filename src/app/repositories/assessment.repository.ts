import Assessment from '@models/entities/assessments'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { AssessmentRepositoryInterface } from './interfaces/assessment.interface'
import { ModelContainer } from '@decorators/model.decorator'

@Service({ global: true })
class AssessmentRepository extends BaseRepository<Assessment> implements  AssessmentRepositoryInterface<Assessment> {
  constructor(@ModelContainer(Assessment.tableName) Assessment: ModelCtor<Assessment>) {
    super(Assessment)
  }

  async createbyName(hr_id: number, name: string, start_date?: Date, end_date?: Date): Promise<Assessment> {
    if (start_date && end_date)
        return this.create({hr_id: hr_id, hname: name, start_date: start_date, end_date: end_date})
    else if (start_date)
        return this.create({hr_id: hr_id, name: name, start_date: start_date})
    else if (end_date)
        return this.create({hr_id: hr_id, name: name, end_date: end_date})
    else
        return this.create({hr_id: hr_id, name: name})
  }

  async findByName(name: string): Promise<Assessment> {
    return this.findByCondition({
      where: { name: name },
      raw: true
    })
  }

  
}

export default AssessmentRepository
