import { addKeyword, EVENTS } from '@builderbot/bot';
// import { flowGracias } from './graciasFlow.js';

///////////////////flujo primario para el departamento de manera general///////////////////////

const menuGeneral = addKeyword(EVENTS.WELCOME)
  .addAnswer('Menu departamento')
  .addAnswer(
    ['1-.Servicio Social', '2-.Visitas Industiales', '3-.Residencias (Poliza)'],
    { capture: true },
    // async (ctx, { gotoFlow, fallback, flowDynamic }) => {
    //   if (!['1', '2', '3', 'salir'].includes(ctx.body)) {
    //     //si no es una de  las opciones
    //     return fallback(
    //       // retornar al usuario validando solo lo que queremos que introduzca el usuario
    //       'Por favor elige un número dentro del menú',
    //     );
    //   }
    //   switch (ctx.body) {
    //     case '1':
    //       return gotoFlow(SSOCIAL.MenuPrincipal);
    //     case '2':
    //       return gotoFlow(require('./visitas'));
    //     case '3':
    //       return gotoFlow();
    //     case 'salir':
    //       return await flowDynamic('saliendo, ¡bye!');
    //   }
    // },
  );

export { menuGeneral };
