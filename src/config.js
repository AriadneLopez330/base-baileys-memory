import dotenv from "dotenv";
dotenv.config();

const {
  ASSISTANT_ID = '',
  OPENAI_API_KEY = '',
  PORT = 3008,
} = process.env;

export { PORT, ASSISTANT_ID, OPENAI_API_KEY };
