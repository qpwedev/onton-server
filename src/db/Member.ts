import { Sequelize, Model, DataTypes } from 'sequelize';

class Member extends Model {
    public id!: number;
    public address!: string;
    public roomId!: number; // Foreign Key to associate member with room
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initModel(sequelize: Sequelize): typeof Member {
        return this.init({
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            roomId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Rooms', // 'Rooms' refers to the table name, make sure it's correctly pluralized
                    key: 'id',
                },
            },
        }, { sequelize, modelName: 'Member' });
    }
}

export default Member;
