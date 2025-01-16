import { addKeyword } from '@builderbot/bot';

export const visIndus = addKeyword(['visitas industriales', 'visitas', 'Visitas'])
  .addAnswer('Bienvenido al área de Visitas industriales')
  .addAnswer('-----DUDAS GENERALES-----')
  .addAnswer([
    '1.- 📅Fecha de apertura y fecha final para la convocatoria de visitas industriales',
    '2.-📂Documentos a entregar',
    '3.-🚌Transporte',
    '4.-📌Seguro social/seguro facultativo',
    '5.-🪪Contacto',
    '\nPor favor, escribe el número de tu opción:'
  ])
  .addAnswer(
   // 'Por favor, escribe el número de tu opción:',
    { capture: true },
    async (ctx, { fallback, flowDynamic }) => {
      const opcion = ctx.body.trim();
      
      const respuestas = {
        '1': [
          '*Fechas para aplicar a la convocatoria para visitas industriales ITT*',
          'Fecha inicial= 16/08/2024', //🗝️ACTUALIZAR CADA SEMESTRE
          'Fecha final= 06/09/2024', //🗝️ACTUALIZAR CADA SEMESTRE
          '*Importante* Es primordial respetar las fechas, de lo contrario NO se podrá llevar a cabo este proceso',
        ],
        '2': [
            'Realizar formulario de registro en la página oficial.',
            '*Documentos a entregar por el docente*',
            '• ITT-VI-PO-001-01 SOLICITUD VISITAS (1er Doc)',
            'Entregar por el docente a la oficina de visitas industriales',
            'Link = https://www.tijuana.tecnm.mx/wp-content/uploads/2023/03/ITT-VI-PO-001-01-SOLICITUD-VISITAS-REV0.-modificado-010223.doc',

            '• ITT-VI-PO-001-05 REPORTE RESULTADOS INCID\n',
            'Llenarse 24 h después de la visita industrial sellado por el departamento académico',
            'LINK= https://www.tijuana.tecnm.mx/wp-content/uploads/2020/09/ITT-VI-PO-001-05-REPORTE-RESULTADOS-INCID.docx',

            '• ITT-VI-PO-001-06 LISTA AUTORIZADA VISITAS\n',
            'Firmado por alumnos y docente, sellado por el departamento académico',
            'LINK = https://www.tijuana.tecnm.mx/wp-content/uploads/2020/09/ITT-VI-PO-001-06-LISTA-AUTORIZADA-VISITAS.doc',

            '*Documentos suministrados por el departamento a través del correo electrónico.*',
            '• ITT-VI-PO-001-02 OF. SOLICIT VISITAS\n',
            'Llenado por el personal administrativo, para solicitar la vista industrial',
            'Se enviará mediante correo electrónico',
            '• ITT-VI-PO-001-03 PROG. VISITAS ACEPT\n',
            'Carta de presntacion, llenada por personal administrativo',
            'Se enviará mediante correo electrónico',
            '• ITT-VI-PO-001-04 PRESENTAC Y AGRADEC\n',
            'llenada por el personal administrativo',
            'Se enviará mediante correo electrónico',
        ],
        '3': [
          '*INFORMACIÓN DE TRANSPORTE*',
          '• Se verificará la disponibilidad en el área de transporte ITT',
          '• Posterior a esto, se notificará al docente mediante correo electrónico la información precisa',
          '1.-*Disponibilidad*',
          '¿El transporte es automático con la solicitud inicial y el llenado de documentos?',
          'El transporte es independiente a la solicitud de visitas industriales, la disposición del transporte está sujeta a cambios.',
          'A)	Solicitudes prioritarias, provenientes de los directivos de CDMX',
          '\n📌Eventos Deportivos',
          '\n📌Eventos Culturales',
          'B) No te preocupes en caso de que sea así, se reagendara la visita,',
          'se te comunicará mediante correo electrónico, con los respectivos',
          'cambios y documentos oficiales.',
        ],
        '4': [
          '*INFORMACIÓN DE SEGURO*',
          '• Es obligatorio contar con seguro facultativo o social vigente (IMSS, ISTE), ya sea el escolar o el otorgado por padres o trabajo',
          'De lo contrario',
          'Es necesario ir al apartado de seguro social o ir a servicios escolares,',
          'para solicitar el seguro escolar.',
          '*Si el alumno no cuenta con seguro, no podrá asistir a la visita*',
        
        ],
        '5': [
          '*Encarada de visitas industriales*',
          '• M.A. Marisol Chávez De Landa',
          'Correo: visitasindustriales@tectijuana.edu.mx',
          'Teléfono: (664) 607-84-00. ext. 143',
        ]
      };

      if (respuestas[opcion]) {
        return flowDynamic(respuestas[opcion]);
      }

      return fallback('⚠️ Por favor, selecciona una opción válida (1-4)');
    }
  )
  .addAnswer(
    [
      '\n¿Deseas consultar otra opción?',
      'Escribe un número (1-5) o escribe *menu* para volver al menú principal'
    ],
    { capture: true },
    async (ctx, { gotoFlow }) => {
      if (ctx.body.toLowerCase() === 'menu') {
        return gotoFlow(menuPrincipalFlow);
      }
    }
  );