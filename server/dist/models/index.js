import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

// Use the Render-provided connection string if present, otherwise use local credentials
let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);  // Use Render's DB_URL for production
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || '',
    process.env.DB_PW || '',  // Changed from DB_PASSWORD to DB_PW for consistency
    {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    }
  );
}
