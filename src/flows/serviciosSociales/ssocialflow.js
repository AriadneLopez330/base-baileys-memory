import { addKeyword, EVENTS } from '@builderbot/bot';


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



export { flowCrono, flowDocs, flowVideo, flowFechas, flowContactoSS };
