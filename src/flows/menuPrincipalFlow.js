import { addKeyword, EVENTS } from '@builderbot/bot';
import { menuSocial } from './serviciosSociales/menuSocial.js';
import {flowGPT } from './serviciosSociales/ssocialflow.js';
// import { flowGracias } from './graciasFlow.js';
import { visIndus } from './visitasIndustriales/visitasmenu.js';
import { flowResidencia } from './residencias/residenciaFlow.js';
//import { flowMenuDudas } from './serviciosSociales/menuDudasFlow.js';

///////////////////flujo primario para el departamento de manera general///////////////////////
export const menuPrincipalFlow = addKeyword(EVENTS.WELCOME)
  .addAnswer([
    '*¡Bienvenido al Departamento de Gestión Tecnológica y Vinculación!* 👋\n',
    'Selecciona el servicio que necesitas:\n',
    '1️⃣ *Servicio Social*',  
    '2️⃣ *Galgo Asistente servicio social*',
    '3️⃣ *Visitas Industriales*',
    '4️⃣ *Residencias Profesionales*',
  ])
  .addAnswer(
    'Por favor, escribe el número de tu opción:',
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow }) => {
      const opcion = ctx.body.trim();

      switch(opcion) {
        case '1':
          return gotoFlow(menuSocial);
        // case '2':
        //   return gotoFlow(flowMenuDudas);
        case '2':
          return gotoFlow(flowGPT);
        case '3':
          return gotoFlow(visIndus);
        case '4':
          return gotoFlow(flowResidencia);
        default:
          return flowDynamic([
            '⚠️ Por favor, selecciona una opción válida (1-4)',
            'Escribe 1, 2, 3 o 4'
          ]);
      }
    }
  );