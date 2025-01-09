import { addKeyword, EVENTS } from '@builderbot/bot';
import {
  flowDocs,
  flowVideo,
  flowFechas,
  flowGPT,
  flowContactoSS,
} from './ssocialflow.js';
import { flowMenuDudas } from './dudasFrecuentes/menuDudasFlow.js';
// O Opción 2: Importar todo como un objeto
//import * as flows from './ssocialflow.js';

// Verificar que los flujos se importaron correctamente
console.log('flowDocs:', flowDocs);
console.log('flowVideo:', flowVideo);
console.log('flowFechas:', flowFechas);
console.log('flowGPT:', flowGPT);
console.log('flowContactoSS:', flowContactoSS);

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
    ])
    .addAnswer(
      'Por favor, escribe el número de tu opción (1-6):',
      { capture: true },
      (ctx, { fallback, flowDynamic, gotoFlow }) => {
        const opcion = ctx.body.trim();
        
        if (opcion === '1') {
          flowDynamic('Accediendo a documentación...');
          return gotoFlow(flowDocs);
        }
        if (opcion === '2') {
          flowDynamic('Accediendo a video...');
          return gotoFlow(flowVideo);
        }
        if (opcion === '3') {
          flowDynamic('Accediendo a fechas...');
          return gotoFlow(flowFechas);
        }
        if (opcion === '4') {
          flowDynamic('Accediendo a dudas frecuentes...');
          return gotoFlow(flowMenuDudas);
        }
        if (opcion === '5') {
          flowDynamic('Accediendo a consulta de documentos...');
          return gotoFlow(flowGPT);
        }
        if (opcion === '6') {
          flowDynamic('Accediendo a contacto...');
          return gotoFlow(flowContactoSS);
        }
        
        return fallback('Por favor, selecciona una opción válida (1-6)');
      }
    );

    //////////////////////////////////
    // .addAnswer(
    //   'Por favor, selecciona una opción (1-6):',
    //   { capture: true },
    //   async (ctx, { fallback, gotoFlow }) => {
    //     const opcion = ctx.body.trim();
        
    //     switch(opcion) {
    //       case '1':
    //         return gotoFlow(flowDocs);
    //       case '2':
    //         return gotoFlow(flowVideo);
    //       case '3':
    //         return gotoFlow(flowFechas);
    //       case '4':
    //         return gotoFlow(flowMenuDudas);
    //       case '5':
    //         return gotoFlow(flowGPT);
    //       case '6':
    //         return gotoFlow(flowContactoSS);
    //       default:
    //         return fallback();
    //     }
    //   }
    // );