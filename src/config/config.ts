import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT,
    logging: console.log,
  },
  corsOptions: {
    origin: process.env.CORSURL ? process.env.CORSURL.split(',') : '*',
    methods: 'GET,POST,PATCH,PUT,DELETE',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token,x-client-secret, Authorization,Access-Control-Allow-Origin',
  },
} as const;

export default config;
