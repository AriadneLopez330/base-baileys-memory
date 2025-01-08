import { addKeyword } from '@builderbot/bot';
import {
  visitasseguro,
  visitascontacto,
  visitasdoc,
  visitasTrans,
  visitfechas,
} from './visitasflow.js';

const visIndus = addKeyword(['visitas industriales', 'visitas', 'Visitas'])
  .addAnswer('Bienvenido al área de Visitas industriales')
  .addAnswer('-----DUDAS GENERALES-----')
  .addAnswer(
    [
      '1.- 📅Fecha de apertura y fecha final para la convocatoria de visitas industriales',
      '2.-📂Documentos a entregar',
      '3.-🚌Transporte',
      '4.-📌Seguro social/seguro facultativo ',
    ],
    { capture: true },
    async (ctx, { gotoFlow, fallback, flowDynamic }) => {
      if (!['1', '2', '3', '4', 'salir'].includes(ctx.body)) {
        //si no es una de  las opciones
        return fallback(
          // retornar al usuario validando solo lo que queremos que introduzca el usuario
          'Por favor elige un número dentro del menú',
        );
      }
      switch (ctx.body) {
        case '1':
          return gotoFlow(visitfechas);
        case '2':
          return gotoFlow(visitasdoc);
        case '3':
          return gotoFlow(visitasTrans);
        case '4':
          return gotoFlow(visitasseguro);
        case '6':
          return gotoFlow(visitascontacto);
        case 'salir':
          return await flowDynamic('saliendo, ¡bye!');
      }
    },
  );

export { visIndus };
