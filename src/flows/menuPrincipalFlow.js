import { addKeyword, EVENTS } from '@builderbot/bot';
import { menuSocial } from './serviciosSociales/menuSocial.js';
import { visIndus } from './visitasIndustriales/visitasmenu.js';
import { flowResidencia } from './residencias/residenciaFlow.js';
import { gptFlow } from './serviciosSociales/gptFlow.js';
import { flowGracias } from './graciasFlow.js';

export const menuPrincipalFlow = addKeyword(EVENTS.WELCOME)
  .addAnswer([
    '*¡Bienvenido al Departamento de Gestión Tecnológica y Vinculación!* 👋\n',
    'Selecciona el servicio que necesitas:\n',
    '1️⃣ *Servicio Social*',  
    '2️⃣ *Galgo Asistente servicio social*',
    '3️⃣ *Visitas Industriales (Docentes)*',
    '4️⃣ *Residencias Profesionales*',
  ])
  .addAnswer(
    'Por favor, escribe el número de tu opción:',
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
      try {
        const opcion = ctx.body.trim();

        switch(opcion) {
          case '1':
            return gotoFlow(menuSocial);
          case '2':
            return gotoFlow(gptFlow);
          case '3':
            return gotoFlow(visIndus);
          case '4':
            return gotoFlow(flowResidencia);
          default:
            await flowDynamic([
              '⚠️ Por favor, selecciona una opción válida (1-4)',
              'Escribe 1, 2, 3 o 4'
            ]);
            await flowDynamic([
              '*¿Qué deseas hacer?*',
              '',
              '1️⃣ Seguir en menú Principal',
              '2️⃣ Finalizar conversación'
            ]);
            return;
        }
      } catch (error) {
        console.error('Error en navegación:', error);
        return fallBack('❌ Ocurrió un error, por favor intenta de nuevo');
      }
    }
  )
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
          return gotoFlow(flowGracias);
        }

        await flowDynamic('⚠️ Opción no válida');
        return gotoFlow(menuPrincipalFlow);

      } catch (error) {
        console.error('Error en navegación:', error);
        return fallBack('❌ Ocurrió un error, por favor intenta de nuevo');
      }
    }
  );