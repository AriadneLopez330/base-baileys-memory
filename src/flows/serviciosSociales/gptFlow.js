import { addKeyword } from '@builderbot/bot';
import { handleQueue } from '../../utils/chatgpt.js';
import { userQueues, userLocks } from '../../utils/state.js';
import { menuSocial } from './menuSocial.js';
import { menuPrincipalFlow } from '../menuPrincipalFlow.js';

export const gptFlow = addKeyword(['documentos servicio social', 'preguntas', 'chatgpt'])
  .addAnswer([
    '*🤖 ¡Hola! Soy Galgo, tu asistente especializado en Servicio Social*',
    '_Estoy aquí para ayudarte con dudas sobre la documentación_',
    '_Mi objetivo es brindarte información precisa y oficial del Instituto Tecnológico_'
  ])
  .addAnswer([
    '🤖 *¿Qué documento quieres consultar?*',
    '📌 _Especificaciones técnicas:_',
    '🔸 Nombre del documento',
    '🔸 Número del punto a consultar',
    '\nEjemplo: Del documento *Solicitud con Foto* quiero saber qué debo poner en *Nombre del Programa (18)*.',
    '\n_Recuerda consultar primero las dudas frecuentes en el menú servicio social._'
  ],
  { capture: true },
  async (ctx, { flowDynamic, state, provider }) => {
    const userId = ctx.from;

    await flowDynamic('🔄 _Procesando tu consulta, dame un momento (5 segundos)..._');

    if (!userQueues.has(userId)) {
      userQueues.set(userId, []);
    }

    const queue = userQueues.get(userId);
    queue.push({ ctx, flowDynamic, state, provider });

    if (!userLocks.get(userId) && queue.length === 1) {
      await handleQueue(userId);
    }

    // Esperamos un momento para mostrar el menú después de la respuesta
    await new Promise(resolve => setTimeout(resolve, 2000));

    await flowDynamic([
      '🤖*¿Qué deseas hacer?*',
      '',
      '1️⃣ Seguir consultando 🤖',
      '2️⃣ Menú Principal',
      '3️⃣ Finalizar conversación',
      '\n_Responde con el número de tu elección_'
    ]);
  })
  .addAnswer(
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic }) => {
      const opcion = ctx.body.trim().toLowerCase();
      const userId = ctx.from;
      //limpiar la cola y el bloqueo del usuario
      if (opcion === '2' || opcion === 'salir') {
        if (userQueues.has(userId)) {
          userQueues.delete(userId);
        }
        if (userLocks.has(userId)) {
          userLocks.delete(userId);
        }
        await flowDynamic('👋 _Gracias por usar el asistente Galgo. ¡Hasta pronto!_');
        return gotoFlow(menuPrincipalFlow);
      }
      
      if (opcion === '1' || opcion === 'menu') {
        await flowDynamic('🔄 Continuemos con la consulta...');
        return gotoFlow(gptFlow);
      }
      if (opcion === '3') {
        return gotoFlow(flowGracias);
      }

      await flowDynamic('⚠️ Opción no válida, por favor intenta de nuevo');
      return gotoFlow(gptFlow);
    }
  );


