import { Sequelize } from 'sequelize';
import Room from './Room';
import Member from './Member';

class Database {
    public sequelize: Sequelize;
    public Room: typeof Room;
    public Member: typeof Member;

    constructor() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: './database.sqlite3',
        });

        this.Room = Room.initModel(this.sequelize);
        this.Member = Member.initModel(this.sequelize);

        this.Room.hasMany(this.Member, { foreignKey: 'roomId' });
        this.Member.belongsTo(this.Room, { foreignKey: 'roomId' });
    }

    async connect(): Promise<void> {
        try {
            await this.sequelize.sync();
            console.log('Database connected!');
        } catch (error) {
            console.error('Database connection failed!', error);
        }
    }
}

const database = new Database();
database.connect();

export default database;
