import { addKeyword } from '@builderbot/bot';
import { flowCrono } from '../ssocialflow.js';
import { flowMenuDudas } from './menuDudasFlow.js';

//////////////////////////// OPCIONES DE FLUJO DUDAS ///////////////////////////
const duda1 = addKeyword('1')
  .addAnswer([
    '1.-¿Donde puedo realizar mi registro para servicio social?',
    '\nEs necesario realizar el curso de inducción',
    'Ingresa al sitio Oficial de Servicio Social',
    '👉https://sitec.tijuana.tecnm.mx/servicio_social/index.php👈',
    '*Ingresa tu matrícula* y pulsa _Curso de inducción_',
  ])
  .addAnswer(['\n*1* o *Menú* Para Terminar la consulta'], null, null, [
    flowMenuDudas,
  ]);
//¿Cuándo inicia el servicio social?
const duda2 = addKeyword(['2', 'Cuando inicia'])
  .addAnswer([
    '*El periodo actual es: *',
    'AGOSTO 24 - FEBRERO 25', //🗝️ACTUALIZAR CADA SEMESTRE
    '\n*La fecha de inscripción*',
    '5 de agosto al 19 de agosto del 2024', //🗝️ACTUALIZAR CADA SEMESTRE
  ])
  .addAnswer(['\n*1* o *Menú* Para Terminar la consulta'], null, null, [
    flowMenuDudas,
  ])
  .addAnswer(
    ['*Cronograma* para consultar "Fechas Importantes de Servicio Social"'],
    null,
    null,
    [flowCrono],
  );
//'¿Cuánto tiempo dura el servicio social?'
const duda3 = addKeyword(['3'])
  .addAnswer([
    '*6 MESES Y 1 DÍA*',
    'Cumpliendo como objetivo con 480 Horas',
    '-------------------------------------------------\n',
    'Para calcular la fecha FINAL de tu servicio social',
    'Es 6 meses y 1 día después de la fecha Inicial\n',
    '*Ejemplo*',
    '*Fecha inicial:* _Lunes 05 de Agosto 2024_ *Terminación:* _Jueves 06 de Febrero 2025_', //🗝️ACTUALIZAR CADA SEMESTRE
  ])
  .addAnswer(['\n*1* Para Terminar la consulta'], null, null, [flowMenuDudas]);
//'No aparece el Servicio Social marcado en AMBAR como materia'
const duda4 = addKeyword('4')
  .addAnswer([
    '1.- Debes acudir con tu coordinador para que lo cargue a Ambar como materia', //CAMBIO DE SITEC A AMBAR
    '2.- También puedes realizar una "constancia de estudios con horario escolar" en línea, donde aparezca _Servicio Social_ en curso\n',
    '_Caso especial y casos comité_',
    '3.- Es importante guardar el comprobante de pago del semestre en curso, y anexarlo en un mismo documento al subir tu kardex a la plataforma, solo en caso de ser necesario',
  ])
  .addAnswer(['\n*1* o *Menú* Para Terminar la consulta'], null, null, [
    flowMenuDudas,
  ]);
//¿Hasta cuándo tengo para subir los documentos?
const duda5 = addKeyword('5')
  .addAnswer([
    'CARGA DE DOCUMENTOS',
    '_FASE 1_',
    '23 al 30 de Agosto de 2024', //🗝️ACTUALIZAR CADA SEMESTRE
    'REVISIÓN FASE 1',
    '24 de Agosto del 2024', //🗝️ACTUALIZAR CADA SEMESTRE
    '_Para más información consulta el *Cronograma*_',
  ])
  .addAnswer(
    ['*Cronograma* para consultar fechas importantes de Servicio Social'],
    null,
    null,
    [flowCrono],
  )
  .addAnswer(['\n*1* o *Menú* Para Terminar la consulta'], null, null, [
    flowMenuDudas,
  ]);
// '¿Dónde puedo realizar mi servicio Social?
const duda6 = addKeyword('6')
  .addAnswer([
    '*BANCO DE DEPENDENCIAS*',
    '\nIngresa al Banco de Dependencias',
    'Puedes seleccionar dependencias Internas y Externas ',
    'https://goo.su/czvxuq', //🗝️ACTUALIZAR CADA SEMESTRE
  ])
  .addAnswer(['\n*1* o *Menú* Para Terminar la consulta'], null, null, [
    flowMenuDudas,
  ]);
//Constancia de liberación
const duda7 = addKeyword('7')
  .addAnswer([
    'La puedes CONSULTAR en Ambar y DESCARGAR el archivo PDF',
    '_Es indispensable guardar este documento, es requisito para tu titulación_',
    '\n🥲*Ya lo consulté en ambar*',
    '_Pero no me aparece ningún PDF_',
    '\nPreséntate al Departamento de Gestión Tecnológica y Vinculación  con los siguientes datos.',
    '*Nombre*',
    '*Número de control*',
    '*Carrera*',
    '*Asunto*',
    '*Unidad (Tomas aquino u Otay)*',
  ])
  .addAnswer(['\n*1* o *Menú* Para Terminar la consulta'], null, null, [
    flowMenuDudas,
  ]);
//'Me llegó un correo para darme de baja, ¿qué debo de hacer?'
const duda8 = addKeyword(['8'])
  .addAnswer([
    'Debes de mandar un correo a <serviciosocial@tectijuana.edu.mx> con tus datos:',
    '*Nombre*',
    '*Número de control*',
    '*Carrera*',
    '*Asunto:*',
    '_Darme de Baja_, junto con una carta de motivos por los cuales te quieres dar de baja del período pasado y continuar en este período (AGO 24 -FEB 25) con tus datos y firmada', //🗝️ACTUALIZAR CADA SEMESTRE
    '_Continuar en el periodo anteriormente Registrado_, mandar un correo con tus datos y notificar que quieres continuar',
    '*Unidad Perteneciente* (Tomas Aquino u Otay)',
  ])
  .addAnswer(['\n*1* o *Menú* Para Terminar la consulta'], null, null, [
    flowMenuDudas,
  ]);

const duda9 = addKeyword([
  '9',
  'Ya subí documentos iniciales, pero no puedo subir la primera fase',
])
  .addAnswer([
    'Debes de notificar vía correo electrónico, que subiste los documentos iniciales, es fundamental seguir la misma cadena de correo electrónico',
    'Si ya mandaste correo electrónico debes esperar de 1 a 3 días hábiles para recibir respuesta',
    'Si ya pasó más tiempo, puedes volver a mandar correo reafirmando que ya subiste tus documentos, es fundamental darle seguimiento a tu expediente vía correo electrónico.',
  ])
  .addAnswer(['\n*1* o *Menú* Para Terminar la consulta'], null, null, [
    flowMenuDudas,
  ]);

const duda10 = addKeyword(['10', '¿Dónde puedo obtener mi seguro facultativo?'])
  .addAnswer([
    'Si ya cuentas con seguro social por parte de padres o trabajo, no es necesario renunciar a esta, es válido, solo subir constancia de vigencia',
    'Solicitar la constancia del seguro social para entrar a la plataforma del IMMS',
    '👉https://goo.su/bS44Mj👈',
    'En caso de vigencia: BAJA',
    'Solicitar en servicios escolares, dada de ALTA en IMSS por la institución',
    'Llenar Formulario de 24h a 72h de respuesta',
    '👉👈', //🗝️ACTUALIZAR CADA SEMESTRE--------------------------------------------
  ])
  .addAnswer(['\n*1* o *Menú* Para Terminar la consulta'], null, null, [
    flowMenuDudas,
  ]);

const questionBackFlow = addKeyword([]).addAnswer(
  ['Quieres volver... '],
  { capture: true },
  async (ctx, { gotoFlow, fallback, flowDynamic }) => {
    if (ctx.body === '1') {
      return gotoFlow(flowMenuDudas);
    }
  },
);

export {
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
};
