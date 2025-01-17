import { addKeyword } from '@builderbot/bot';
import { handleQueue } from '../../utils/chatgpt.js';
import { userQueues, userLocks } from '../../utils/state.js';
import { menuSocial } from './menuSocial.js';
import { menuPrincipalFlow } from '../menuPrincipalFlow.js';

export const gptFlow = addKeyword(['documentos servicio social', 'preguntas', '5', 'chatgpt'])
  .addAnswer(
    '*🤖 Bienvenido al Asistente Galgo*\n_Especialista en Servicio Social_'
  )
  .addAnswer(
    [
      '🤖 *¿Qué documento quieres consultar?*',
      '📌 _Especificaciones técnicas_',
      '🔸 Nombre del documento',
      '🔸 Número del punto a consultar',
      '\nEjemplo: Del documento *solicitud con foto* quiero saber qué debo poner en *Nombre del Programa (18)*.',
      '\n_Recuerda consultar primero las dudas frecuentes._'
    ],
    { capture: true },
    async (ctx, { flowDynamic, state, provider }) => {
      const userId = ctx.from;

      // Mensaje de procesamiento
      await flowDynamic('🔄 _Procesando tu consulta, dame un momento..._');

      if (!userQueues.has(userId)) {
        userQueues.set(userId, []);
      }

      const queue = userQueues.get(userId);
      queue.push({ ctx, flowDynamic, state, provider });

      if (!userLocks.get(userId) && queue.length === 1) {
        await handleQueue(userId);
      }
    }
  )
  .addAnswer(
    [
      '🔄 Puedes hacer otra consulta:',
      '🔴 Escribe "menu" para volver al menú principal',
      '🟡 Escribe "salir" para terminar'
    ],
    { capture: true },
    async (ctx, { flowDynamic, state, provider, gotoFlow }) => {
      const text = ctx.body.toLowerCase();
      
      if (text === 'menu') {
        return gotoFlow(menuSocial);
      }
      else if (text === 'salir') {
        return gotoFlow(menuPrincipalFlow);
      }
      
      // Mensaje de procesamiento para consultas adicionales
      await flowDynamic('🔄 _Procesando tu consulta, dame un momento..._');
      
      // Procesar nueva consulta
      const userId = ctx.from;
      if (!userQueues.has(userId)) {
        userQueues.set(userId, []);
      }

      const queue = userQueues.get(userId);
      queue.push({ ctx, flowDynamic, state, provider });

      if (!userLocks.get(userId) && queue.length === 1) {
        await handleQueue(userId);
      }

      return gotoFlow(gptFlow);
    }
  );

