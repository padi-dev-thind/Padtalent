import { ModelCtor } from 'sequelize-typescript'

import DB from '@models/index'
import Hr from '@models/entities/hrs'

export function getModelFromTableName(tableName: string): ModelCtor | undefined {
  let item = undefined
  switch (tableName) {
    case Hr.tableName:
      item = DB.sequelize.model(Hr)
      break
    default:
      item = undefined
      break
  }
  return item
}
