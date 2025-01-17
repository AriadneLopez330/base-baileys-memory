import { addKeyword } from '@builderbot/bot';
import { menuPrincipalFlow } from './menuPrincipalFlow.js';

export const flowGracias = addKeyword(['gracias', 'grac', 'seria todo', 'seria todo gracias'])
  .addAnswer([
    '*¡Ha sido un placer ayudarte! 👋*',
    '_Soy tu Asistente Galgo, siempre dispuesto a brindarte la mejor ayuda_',
    '',
    '1️⃣ Volver al menú principal',
    '2️⃣ Finalizar conversación'
  ])
  .addAnswer(
    '_Responde con el número de tu elección_',
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic, fallBack }) => {
      try {
        const opcion = ctx.body.trim().toLowerCase();
        
        if (opcion === '1') {
          await flowDynamic('↩️ Volviendo al menú Principal...');
          return gotoFlow(menuPrincipalFlow);
        }
        
        if (opcion === '2') {
          return flowDynamic([
            '👋 ¡Gracias por usar nuestro servicio!',
            '_Hasta pronto_'
          ]);
        }

        await flowDynamic('⚠️ Opción no válida');
        return gotoFlow(flowGracias);

      } catch (error) {
        console.error('Error en navegación:', error);
        return fallBack('❌ Ocurrió un error, por favor intenta de nuevo');
      }
    }
  );
