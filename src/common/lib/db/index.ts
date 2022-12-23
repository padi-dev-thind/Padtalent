import { ModelCtor } from 'sequelize-typescript'

import DB from '@models/index'
import Hr from '@models/entities/hrs'
import Assessment from '@models/entities/assessments'
import Assessments_game_types from '@models/entities/assessments_game_types'
import Game_type from '@models/entities/game_types'
import Hrs_game_types from '@models/entities/hrs_game_types'
import Candidates from '@models/entities/candidates'
import Candidates_assessments from '@models/entities/candidates_assessments'
import Logical_questions from '@models/entities/logical_questions'
import Logical_questions_test from '@models/entities/logical_questions_test'
import Memory_questions from '@models/entities/memory_questions'
import Memory_questions_test from '@models/entities/memory_questions_test'
import Tests from '@models/entities/tests'


export function getModelFromTableName(tableName: string): ModelCtor | undefined {
  let item = undefined
  switch (tableName) {
    case Hr.tableName:
      item = DB.sequelize.model(Hr)
      break
    case Assessment.tableName:
      item = DB.sequelize.model(Assessment)
      break
    case Assessments_game_types.tableName:
      item = DB.sequelize.model(Assessments_game_types)
      break
    case Game_type.tableName:
      item = DB.sequelize.model(Game_type)
      break
    case Hrs_game_types.tableName:
      item = DB.sequelize.model(Hrs_game_types)
      break
    case Candidates.tableName:
        item = DB.sequelize.model(Candidates)
        break
    case Candidates_assessments.tableName:
        item = DB.sequelize.model(Candidates_assessments)
        break
    case Logical_questions.tableName:
        item = DB.sequelize.model(Logical_questions)
        break
    case Logical_questions_test.tableName:
        item = DB.sequelize.model(Logical_questions_test)
        break
    case Memory_questions.tableName:
        item = DB.sequelize.model(Memory_questions)
        break
    case Memory_questions_test.tableName:
        item = DB.sequelize.model(Memory_questions_test)
        break
    case Tests.tableName:
        item = DB.sequelize.model(Tests)
        break
    default:
      item = undefined
      break
  }
  return item
}
