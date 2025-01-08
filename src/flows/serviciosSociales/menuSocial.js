import { addKeyword, EVENTS } from '@builderbot/bot';
import { flowDocs, flowVideo, flowFechas, flowGPT, flowContactoSS } from './ssocialflow.js';
import { flowMenuDudas } from './dudasFrecuentes/menuDudasFlow.js';

////////////////////////////Menu principal de servicio social///////////////////////////////////////
export const menuSocial = addKeyword(EVENTS.WELCOME)
  //const MenuPrincipal = addKeyword ('Servicio Social')
  .addAnswer('¿Como puedo ayudarte?😁')
  .addAnswer(
    [
      'Te comparto los siguientes links de interés sobre el proceso\n',
      '                             *SERVICIO SOCIAL*',
      '_Departamento De Gestión Tecnológica Y Vinculación_\n',
      '🧾 *1* Para ver la documentación',
      '🎬 *2* Para Dudas Generales (Video)',
      '👉 *3* Fechas Importantes del Servicio Social',
      '🤔 *4* Dudas Frecuentes de los alumnos',
      '📂 *5* Consulta respecto a documentos de servicio social',
      '👩‍💻 *6* CONTACTO Unidad Tomas Aquino y OTAY ',
    ],
    { capture: true },
    async (ctx, { fallback,  }) => {
      if (!['1', '2', '3', '4', '5', '6', 'salir'].includes(ctx.body)) {
        //si no es una de  las opciones
        return fallback(
          // retornar al usuario validando solo lo que queremos que introduzca el usuario
          'Por favor elige un número dentro del menú',
        );
      }
      switch (ctx.body) {
        case '1':
          return gotoFlow(flowDocs);
        case '2':
          return gotoFlow(flowVideo);
        case '3':
          return gotoFlow(flowFechas);
        case '4':
          return gotoFlow(flowMenuDudas);
        case '5':
          return gotoFlow(flowGPT);
        case '6':
          return gotoFlow(flowContactoSS);
        case 'salir':
          return await flowDynamic('saliendo, ¡bye!');
      }
    },
  );