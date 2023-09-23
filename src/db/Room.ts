import { Sequelize, Model, DataTypes } from 'sequelize';


import Member from './Member';

class Room extends Model {
    public id!: number;
    public name!: string;
    public password!: string;
    public admin_wallet!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public Members!: Member[];

    static initModel(sequelize: Sequelize): typeof Room {
        return this.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            admin_wallet: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, { sequelize, modelName: 'Room' });
    }
}

export default Room;
