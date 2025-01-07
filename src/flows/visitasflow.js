import { addKeyword, EVENTS } from '@builderbot/bot';

const visitfechas = addKeyword ('1').addAction (
    [
        'Fechas para aplicar a la convocatoria para visitas industriales ITT',
        'Fecha inicial= 16/08/2024', //🗝️ACTUALIZAR CADA SEMESTRE
        'Fecha final= 06/09/2024',//🗝️ACTUALIZAR CADA SEMESTRE
        '*Importante* Es primordial respetar las fechas, de lo contrario NO se podrá llevar a cabo este proceso'
    ]
)/*.addAnswer(
    
    [
        '\n*1* Para Terminar la consulta'
    ], 
    null,
    null,
    [flowMenu]
)*/

const visitasdoc = addKeyword ('2').addAnswer (
[
    'Realizar formularo de registro en la paguina oficial',
    'Documentos a entregar por el docente',
    '\nITT-VI-PO-001-01 SOLICITUD VISITAS (1er Doc)',
    'Entregar por el docente a la oficina de visitas industriales',
    'Link = https://www.tijuana.tecnm.mx/wp-content/uploads/2023/03/ITT-VI-PO-001-01-SOLICITUD-VISITAS-REV0.-modificado-010223.doc',

    '\nITT-VI-PO-001-05 REPORTE RESULTADOS INCID\n',
    'Llenarse 24 h después de la visita industrial sellado por el departamento académico',
    'LINK= https://www.tijuana.tecnm.mx/wp-content/uploads/2020/09/ITT-VI-PO-001-05-REPORTE-RESULTADOS-INCID.docx',


    '\nITT-VI-PO-001-06 LISTA AUTORIZADA VISITAS\n',
    'Firmado por alumnos y docente, sellado por el departamento académico',
    'LINK = https://www.tijuana.tecnm.mx/wp-content/uploads/2020/09/ITT-VI-PO-001-06-LISTA-AUTORIZADA-VISITAS.doc',

    '\nDocuemntos entregados por el departamento mediante correo electrónico',
    '\nITT-VI-PO-001-02 OF. SOLICIT VISITAS\n',
    'Llenado por el personal administrativo, para solicitar la vista industrial',
    'Se enviará mediante correo electrónico',
    '\nITT-VI-PO-001-03 PROG. VISITAS ACEPT\n',
    'Carta de presntacion, llenada por personal administrativo',
    'Se enviará mediante correo electrónico',
    '\nITT-VI-PO-001-04 PRESENTAC Y AGRADEC\n',
    'llenada por el personal administrativo',
    'Se enviará mediante correo electrónico',
]
).addAnswer(
    
[
    '\n*1* Para Terminar la consulta'
]
)
const visitasTrans = addKeyword ('3').addAnswer (
[
    'Se verificará la disponibilidad en el área de transporte ITT',
    'Posterior a esto, se notificará al docente mediante correo electrónico la información precisa'
]
).addAnswer (
[
    '1.-*Disponibilidad*',
    '¿El transporte es automático con la solicitud inicial y el llenado de documentos?',
    'El transporte es independiente a la solicitud de visitas industriales, la disposición del transporte está sujeta a cambios.'
]
).addAnswer(
[
    'A)	Solicitudes prioritarias, provenientes de los directivos de CDMX',
    '\n📌Eventos Deportivos',
    '\n📌Eventos Culturales'
]
).addAnswer (
[
    'No te preocupes en caso de que sea así, se reagendara la visita,',
    'se te comunicará mediante correo electrónico, con los respectivos',
    'cambios y documentos oficiales.'
]
)

const visitasseguro = addKeyword ('4').addAnswer (
[
    '🪪Seguro vigente',
    '\nEs requisito para realizar una visita industrial,',
    'deben de contar con seguro facultativo (IMSS, ISTE), ya sea el escolar o el otorgado por padres o trabajo'
]
).addAnswer(
[
    'De lo contrario',
    'Es necesario ir al apartado de seguro social o ir a servicios escolares,',
    'para solicitar el seguro escolar.',
    '*Si el alumno no cuenta con seguro, no podrá asistir a la visita*'
]
)

const Visindus = addKeyword (['visitas industriales', 'visitas', 'Visitas']).addAnswer ('Bienvenido al área de Visitas industriales')
.addAnswer('-----DUDAS GENERALES-----')
.addAnswer(
[
    '1.- 📅Fecha de apertura y fecha final para la convocatoria de visitas industriales',
    '2.-📂Documentos a entregar',
    '3.-🚌Transporte',
    '4.-📌Seguro social/seguro facultativo ',
],
{capture: true},
async (ctx, {gotoFlow, fallback, flowDynamic}) => {
    if (!['1', "2", "3", "4", "salir"].includes(ctx.body)) { //si no es una de  las opciones 
        return fallback(  // retornar al usuario validando solo lo que queremos que introduzca el usuario
            "Por favor elige un número dentro del menú"
        );
    }
    switch (ctx.body) {
        case '1':
            return gotoFlow (visitfechas);
        case '2':
            return gotoFlow (visitasdoc);
        case '3':
            return gotoFlow (visitasTrans);
        case '4':
            return gotoFlow(visitasseguro);
        case '6':
            return gotoFlow(flowContacto);
        case 'salir':
            return await flowDynamic ('saliendo, ¡bye!');

    }
}
)
export {Visindus}