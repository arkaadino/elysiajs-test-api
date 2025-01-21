import {Model, Column, Table, DataType} from 'sequelize-typescript';


export type CategoriesEntity = {
    id?: number;
    name: string;
    is_active: number;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date | null;
}


@Table({tableName: 'categories', paranoid:true, timestamps:true, createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' })
export class Category extends Model<CategoriesEntity> {
    @Column({
        field: 'id',
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        field: 'name',
        type: DataType.STRING,
    })
    name!: string;

    @Column({
        field: 'is_active',
        type: DataType.TINYINT,
        defaultValue: 0,
    })
    is_active!: number;

    @Column({
        field: 'created_at',
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    created_at!: Date;

    @Column({
        field: 'updated_at',
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    updated_at!: Date;

    @Column({
        field: 'deleted_at',
        type: DataType.DATE,
    })
    deleted_at!: Date;
}