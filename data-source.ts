import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'empreendedor',
  entities: [__dirname + '/src/domain/entities/*.{ts,js}'],
  migrations: [__dirname + '/src/infra/migrations/*.{ts,js}'],
  synchronize: false,
});
