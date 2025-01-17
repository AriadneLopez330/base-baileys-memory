import { addKeyword } from '@builderbot/bot';
import { handleQueue } from '../../utils/chatgpt.js';
import { userQueues, userLocks } from '../../utils/state.js';
import { menuSocial } from './menuSocial.js';
import { menuPrincipalFlow } from '../menuPrincipalFlow.js';

export const gptFlow = addKeyword(['documentos servicio social', 'preguntas', '5', 'chatgpt'])
  .addAnswer(
    [
      '*🤖 ¡Hola! Soy Galgo, tu asistente especializado en Servicio Social*',
      '_Estoy aquí para ayudarte con dudas sobre la documentación_',
      '_Mi objetivo es brindarte información precisa y oficial del Instituto Tecnológico_'
    ]
  )
  .addAnswer(
    [
      '🤖 *¿Qué documento quieres consultar?*',
      '📌 _Especificaciones técnicas:_',
      '🔸 Nombre del documento',
      '🔸 Número del punto a consultar',
      '\nEjemplo: Del documento *Solicitud con Foto* quiero saber qué debo poner en *Nombre del Programa (punto 18)*.',
      '\n_Recuerda consultar primero las dudas frecuentes en el menú servicio social._'
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
      '🟡 Escribe "salir" para terminar la consulta'
    ],
    { capture: true },
    async (ctx, { flowDynamic, state, provider, gotoFlow }) => {
      const text = ctx.body.toLowerCase();
      
      if (text === 'menu') {
        return gotoFlow(menuSocial);
      }
      else if (text === 'salir') {
        await flowDynamic('👋 _Gracias por usar el asistente Galgo. ¡Hasta pronto!_');
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

