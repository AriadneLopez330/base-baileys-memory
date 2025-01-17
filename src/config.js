import dotenv from 'dotenv';
dotenv.config();

const {
  ASSISTANT_ID,
  OPENAI_API_KEY,
  PORT = 3008,
} = process.env;

// Verificación de variables críticas
if (!OPENAI_API_KEY || !ASSISTANT_ID) {
  console.error('⚠️ Faltan variables de entorno críticas:');
  if (!OPENAI_API_KEY) console.error('- OPENAI_API_KEY no está definida');
  if (!ASSISTANT_ID) console.error('- ASSISTANT_ID no está definido');
}

export { 
  PORT, 
  ASSISTANT_ID, 
  OPENAI_API_KEY 
};