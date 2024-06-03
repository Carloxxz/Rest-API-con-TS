import { Table, Column, Model, DataType, Default, DeletedAt } from "sequelize-typescript";

@Table({
    tableName: 'products'
})

class Proudct extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @Column({
        type: DataType.FLOAT(6, 2)
    })
    declare price: number
    
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Proudct