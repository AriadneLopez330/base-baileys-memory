import { addKeyword } from '@builderbot/bot';
import { duda1 } from './dudasFlows.js';

// flujo dudas donde se vacían todas las preguntas más frecuentes del servicio social
export const flowDudas = addKeyword(['Dudas', 'duda', 'dud'])
  .addAnswer('🙌 Hola ¿qué puedo hacer para usted?')
  .addAnswer(
    [
      '1.- ¿Dónde puedo realizar mi registro para servicio social?',
      '\n2.- ¿Cuándo inicia el servicio social?',
      '\n3.- ¿Cuánto tiempo dura el servicio social?',
      '\n4.- No aparece el Servicio Social marcado en Ambar como materia',
      '\n5.- ¿Hasta cuándo tengo para subir los documentos?',
      '\n6.- ¿Dónde puedo realizar mi servicio Social?',
      '\n7.- Necesito mi constancia de liberación',
      '\n8.- Me llegó un correo para darme de baja, ¿qué debo de hacer?',
      '\n9.- Ya subí documentos iniciales, pero no puedo subir la primera fase',
      '\n10.- ¿Dónde puedo obtener mi seguro facultativo?',
      '\n*Menú* Para de Dudas',
    ],
    { capture: true },
    async (ctx, { gotoFlow, fallback, flowDynamic }) => {
      if (!['1', '2', '3', '4', '5', '6', 'salir'].includes(ctx.body)) {
        //si no es una de  las opciones
        return fallback(
          // retornar al usuario validando solo lo que queremos que introduzca el usuario
          'Por favor elige un número dentro del menú',
        );
      }
      // switch (ctx.body) {
      //   case '1':
      //     return gotoFlow(flow1);
      //   case '2':
      //     return gotoFlow(flow2);
      //   case '3':
      //     return gotoFlow(flow3);
      //   case '4':
      //     return gotoFlow(flow4);
      //   case '5':
      //     return gotoFlow(flow5);
      //   case '6':
      //     return gotoFlow(flow6);
      //   case '5':
      //     return gotoFlow(flow7);
      //   case '6':
      //     return gotoFlow(flow8);
      //   case '5':
      //     return gotoFlow(flow9);
      //   case '6':
      //     return gotoFlow(flow10);
      //   case 'salir':
      //     return await flowDynamic('saliendo, ¡bye!');
      // }
    },
  );