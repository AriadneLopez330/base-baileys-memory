import { addKeyword } from '@builderbot/bot';
import { handleQueue } from '../../utils/chatgpt.js';
import { userQueues, userLocks } from '../../utils/state.js';
import { menuSocial } from './menuSocial.js';
import { menuPrincipalFlow } from '../menuPrincipalFlow.js';
import { flowGracias } from '../graciasFlow.js';
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
    '🔸 Nombre y número del punto a consultar',
    '\nEjemplo: Del documento *Solicitud con Foto* quiero saber qué debo poner en *Nombre del Programa (18)*.',
    '\n_Recuerda consultar primero las dudas frecuentes en el menú servicio social._',
    '',
    '*También puedes:*',
    '2️⃣ Ir al Menú Principal',
    '3️⃣ Finalizar conversación'
  ],
  { capture: true },
  async (ctx, { flowDynamic, state, provider, gotoFlow }) => {
    const userId = ctx.from;
    const input = ctx.body.trim().toLowerCase();
    // Primero verificamos si es una opción de menú
    if (input === '2' || input === 'menu' || input === 'salir') {
      return gotoFlow(menuPrincipalFlow);
    }
    if (input === '3') {
      return gotoFlow(flowGracias);
    }
    // Si no es opción de menú, procesamos como consulta
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
    await new Promise(resolve => setTimeout(resolve));
    await flowDynamic([
      '*¿Qué deseas hacer?*',
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
      switch(opcion) {
        case '1':
          await flowDynamic('🔄 Continuemos con la consulta...');
          return gotoFlow(gptFlow);
          
        case '2':
          if (userQueues.has(userId)) userQueues.delete(userId);
          if (userLocks.has(userId)) userLocks.delete(userId);
          await flowDynamic('↩️ Volviendo al menú Principal...');
          return gotoFlow(menuPrincipalFlow);
          
        case '3':
          if (userQueues.has(userId)) userQueues.delete(userId);
          if (userLocks.has(userId)) userLocks.delete(userId);
          return gotoFlow(flowGracias);
          
        default:
          await flowDynamic('⚠️ Opción no válida');
          return gotoFlow(gptFlow);
      }
    }
  );

