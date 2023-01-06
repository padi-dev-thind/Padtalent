import { AutoIncrement, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import Assessment from './assessments'
import Game_type from './game_types'
import Hrs_game_type from './hrs_game_types'

@Table({
  tableName: 'hrs',
})
export default class Hr extends Model<Hr> {
  
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  }
  )
  id!: string

  @Column
  name!: string
  
  @Column
  logo!: string

  @Column
  email!: string

  @Column
  role!: string

  @Column
  company!: string

  @HasMany(() => Assessment,{
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    hooks: true
  })
  assessments: Assessment[]

  @BelongsToMany(() => Game_type, {
    through: { model: () => Hrs_game_type },
  })
  game_type: Game_type[]

  @Column
  company_industry!: string

  @Column
  company_size!: string

  @Column
  password!: string

  @Column
  is_admin!: boolean

  @CreatedAt
  @Column
  created_at!: Date

  @UpdatedAt
  @Column
  updated_at!: Date

  @DeletedAt
  @Column
  deleted_at!: Date
}
