import { addKeyword, EVENTS } from '@builderbot/bot';
import { menuSocial } from './serviciosSociales/menuSocial.js';

// import { flowGracias } from './graciasFlow.js';
import { visIndus } from './visitasIndustriales/visitasmenu.js';
import { flowResidencia } from './residencias/residenciaFlow.js';

///////////////////flujo primario para el departamento de manera general///////////////////////
const menuPrincipalFlow = addKeyword(EVENTS.WELCOME)
  .addAnswer('Bienvenido! Menu departamento')
  .addAnswer(
    ['1. Servicio Social', '2. Visitas Industiales', '3. Residencias (Poliza)'],
    { capture: true },
    async (
      ctx,
      {
        gotoFlow,
        fallback,
        flowDynamic
      },
    ) => {
      if (!['1', '2', '3', 'salir'].includes(ctx.body)) {
        //si no es una de  las opciones
        return fallback(
          // retornar al usuario validando solo lo que queremos que introduzca el usuario
          'Por favor elige un número dentro del menú',
        );
      }
      switch (ctx.body) {
        case '1':
          return gotoFlow(menuSocial);
        case '2':
          return gotoFlow(visIndus);
        case '3':
          return gotoFlow(flowResidencia);
        case 'salir':
          return await flowDynamic('saliendo, ¡bye!');
      }
    },
  );

export { menuPrincipalFlow };
