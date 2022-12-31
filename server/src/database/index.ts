import { Sequelize } from 'sequelize';
import { passwordDefiner } from './models/password.model';

const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db.sqlite' });

const modelDefiners = [passwordDefiner];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

export default sequelize;
