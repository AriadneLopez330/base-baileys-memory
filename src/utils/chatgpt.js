import 'dotenv/config';
import { toAsk } from '@builderbot-plugins/openai-assistants';
import { typing } from './presence.js';
import { ASSISTANT_ID, OPENAI_API_KEY } from '../config.js';
import { userQueues, userLocks } from './state.js';

const processUserMessage = async (ctx, { flowDynamic, state, provider }) => {
  try {
    if (!OPENAI_API_KEY || !ASSISTANT_ID) {
      throw new Error('Credenciales de OpenAI no configuradas');
    }

    await typing(ctx, provider);
    console.log('Procesando mensaje con Assistant ID:', ASSISTANT_ID);
    
    const response = await toAsk(ASSISTANT_ID, ctx.body, state, OPENAI_API_KEY);
    console.log('Respuesta recibida:', response);

    if (!response) {
      throw new Error('No se recibió respuesta del asistente');
    }

    const chunks = response.split(/\n\n+/);
    for (const chunk of chunks) {
      const cleanedChunk = chunk.trim()
        .replace(/【.*?】/g, '')
        .replace(/\[\d+:\d+†source\]/g, '')
        .replace(/^\s+|\s+$/g, '');
      
      if (cleanedChunk) {
        await flowDynamic([{ body: cleanedChunk }]);
      }
    }
  } catch (error) {
    console.error('Error detallado en processUserMessage:', error);
    await flowDynamic('❌ Error al procesar tu consulta. Por favor, verifica que tu pregunta sea sobre servicio social.');
  }
};

const handleQueue = async userId => {
  const queue = userQueues.get(userId);

  if (!queue) {
    console.error(`Queue not found for user ${userId}`);
    return;
  }

  if (userLocks.get(userId)) {
    return;
  }

  while (queue.length > 0) {
    userLocks.set(userId, true);
    const { ctx, flowDynamic, state, provider } = queue.shift();
    try {
      await processUserMessage(ctx, { flowDynamic, state, provider });
    } catch (error) {
      console.error(`Error processing message for user ${userId}:`, error);
    } finally {
      userLocks.set(userId, false);
    }
  }

  userLocks.delete(userId);
  userQueues.delete(userId);
};

export { handleQueue };
