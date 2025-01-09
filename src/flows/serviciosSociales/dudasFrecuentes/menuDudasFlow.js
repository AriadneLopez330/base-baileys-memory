import { addKeyword } from '@builderbot/bot';
import {
  duda1,
  duda2,
  duda3,
  duda4,
  duda5,
  duda6,
  duda7,
  duda8,
  duda9,
  duda10,
} from './dudasFlows.js';

// flujo dudas donde se vacían todas las preguntas más frecuentes del servicio social
export const flowMenuDudas = addKeyword(['Dudas', 'duda', 'dud', '4'])
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
      switch (ctx.body) {
        case '1':
          return gotoFlow(duda1);
        case '2':
          return gotoFlow(duda2);
        case '3':
          return gotoFlow(duda3);
        case '4':
          return gotoFlow(duda4);
        case '5':
          return gotoFlow(duda5);
        case '6':
          return gotoFlow(duda6);
        case '7':
          return gotoFlow(duda7);
        case '8':
          return gotoFlow(duda8);
        case '9':
          return gotoFlow(duda9);
        case '10':
          return gotoFlow(duda10);
        case 'salir':
          return await flowDynamic('saliendo, ¡bye!');
      }
    },
  );
