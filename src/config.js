import dotenv from 'dotenv';
dotenv.config();

const {
  ASSISTANT_ID = '',
  OPENAI_API_KEY = '',
  PORT = 3008,
  MONGO_DB_URI = '',
  MONGO_DB_NAME = '',
} = process.env;

export { PORT, ASSISTANT_ID, OPENAI_API_KEY, MONGO_DB_URI, MONGO_DB_NAME };
