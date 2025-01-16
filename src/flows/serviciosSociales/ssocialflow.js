import { addKeyword, EVENTS } from '@builderbot/bot';

import { handleQueue } from '../../utils/chatgpt.js';

const flowContactoSS = addKeyword([
  'Contacto',
  'Encargada de servicio social',
  'otay',
  'tomas aquino',
  '6',
]).addAnswer([
  '--------UNIDAD TOMAS AQUINO-----------\n',
  '*Nayeli Irene Fernández González*', //🗝️ACTUALIZAR EN CAMBIO ADMINISTRATIVO
  'Oficina de Servicio Social Unidad Tomás Aquino',
  'Teléfono: (664) 607-84-00 Ext. 123', //🗝️ACTUALIZAR EN CAMBIO ADMINISTRATIVO
  'serviciosocial@tectijuana.edu.mx',
  '\n------------UNIDAD OTAY---------------',
  '\n*Lucrecia Cano Montalvo*', //🗝️ACTUALIZAR EN CAMBIO ADMINISTRATIVO
  'Oficina de Servicio Social Unidad OTAY',
  'Teléfono: (664) 607-84-00 Ext. 204', //🗝️ACTUALIZAR EN CAMBIO ADMINISTRATIVO
  '<serviciosocialotay@tectijuana.edu.mx>',
]);
// export const flowMenu = addKeyword(['Menu', 'menú'])
//   .addAnswer(['¡Hasta la próxima, Galgo!', '*Menú* si tienes mas consultas'])
//   .addAnswer(
//     { capture: true, buttons: [{ body: 'Ir a Menú' }] },

//     async (ctx, { endFlow }) => {
//       if (ctx.body == 'Ir a Menú')
//         //////////CHECAR-------------------
//         return endFlow({
//           body: '❌ Su solicitud ha sido cancelada ❌', // Aquí terminamos el flow si la condición se cumple
//         });
//       return flowMenu();
//     },
//   );
const flowCrono = addKeyword([
  'Cronograma',
  'crono',
  'fechas importantes',
  'fecha',
  'cono',
]).addAnswer('*SERVICIO SOCIAL*\n_CRONOGRAMA DE ACTIVIDADES_', {
  media:
    'https://www.tijuana.tecnm.mx/wp-content/uploads/2024/08/Cronograma-de-Actividades-del-servicio-social-ago-dic24-1.png',
});

//FLUJO HIJO documentación del servicio social

const flowDocs = addKeyword('1')
  .addAnswer([
    '📄 Apartado de Servicio Social',
    'https://www.tijuana.tecnm.mx/servicio-social/',
  ])
  .addAnswer([
    '*Formatos para Proceso de Servicio Social*',
    '\n📂Manual de apertura de expediente✒️',
    '\n(*FASE 1*)',
    'https://www.tijuana.tecnm.mx/wp-content/uploads/2024/08/MANUAL-1-AGO-DIC-2024-REVISADO.pdf',
    '\n(*FASE 2*)',
    'https://www.tijuana.tecnm.mx/wp-content/uploads/2024/08/MANUAL-2-AGO2024-REVISADO.pdf',
    '\n*Documentación de Curso de Inducción*',
    'https://view.genially.com/663d4ada521f6000143c2380/presentation-guia-de-induccion-servicio-social-del-tecnologico',
    '\nVideo de Inducción, Preguntas Generales del servicio social',
    'https://youtu.be/OCyEh-ACckA',
  ])
  //.addAnswer(['\n*1* Para Terminar Consulta'], null, null, [flowMenu]);

///////////////////////FLUJO VIDEO DE SERVICIO SOCIAL/////////////////////////////////////

const flowVideo = addKeyword('video', 'Vido', 'vidio', '2')
  .addAnswer([
    'Si tienes dudas respecto al servicio social, consulta el video de inducción\n',
    'Donde explicamos cuestionamientos generales que los alumnos suelen tener',
  ])
  .addAnswer(
    'VIDEO DE INDUCCIÓN SERVICIO SOCIAL ITT',
    '\n https://youtu.be/OCyEh-ACckA',
  )
//FLUJO HIJO
const flowFechas = addKeyword(['fechas', 'fecha', 'tiempo', '3'])
  .addAnswer([
    '*Fechas importantes para el Servicio Social*\n',
    'REGISTRO AL SERVICIO SOCIAL',
    'Inscripción del 5 de agosto al 19 de agosto del 2024\n',
    'Apertura del expediente',
    '',
  ])

///////////////////////////////////

//chatgpt

const flowGPT = addKeyword(['documentos servicio social', 'preguntas', '5'])
  .addAnswer(
    '¿Cuáles son tus dudas respecto al servicio social?',
    null,
    async () => {
      await handleQueue.handleMsgChatGPT(PROMP); //uso de la función de handleMsgChatGPT para obtener la respuesta del chatgpt
    },
  )
  .addAnswer(
    [
      '🟢Específica el que documento tu duda,',
      '\n⭕Punto (número) dónde tienes problemas del llenado',
    ],
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const respuesta = await handleQueue.handleMsgChatGPT(ctx.body); //uso de la función de handleMsgChatGPT para obtener la respuesta del chatgpt
      const mensaje = respuesta.text; // aquí se encuentra la respuesta
      if (ctx.body.toString() !== 'terminar consulta') {
        await flowDynamic(mensaje);
      }
    },
  )
  .addAnswer(
    [ 
      '🔴 "social" para volver al menú dudas frecuentes',
      '🟡 "salir" para volver al menú principal'
    ],
    { capture: true },
    async (ctx, { gotoFlow }) => {
      if (ctx.body.toLowerCase() === 'social') {
        return gotoFlow(menuSocial);
      }
      else if (ctx.body.toLowerCase() === 'salir') {
          return gotoFlow(menuPrincipalFlow);
      }
    }
  );


export { flowCrono, flowDocs, flowVideo, flowFechas, flowGPT, flowContactoSS };
