const { addKeyword, EVENTS, addAnswer, ProviderClass } = require('@bot-whatsapp/bot')
const ChatGPTClass = require('./chatgpt.class'); //mandar a llamar a la clase ChatGPTClass

const ChatGPTInstance = new ChatGPTClass();


const flowContacto = addKeyword(['Contacto','correo','Encargada de servicio social','ana','nayeli','otay']).addAnswer(
    [
        '--------UNIDAD TOMAS AQUINO-----------\n',
        '*Nayeli Irene Fernández González*',   //🗝️ACTUALIZAR EN CAMBIO ADMINISTRATIVO
        'Oficina de Servicio Social Unidad Tomás Aquino',
        'Teléfono: (664) 607-84-00 Ext. 123',    //🗝️ACTUALIZAR EN CAMBIO ADMINISTRATIVO
        'serviciosocial@tectijuana.edu.mx',
        '\n------------UNIDAD OTAY---------------',
        '\n*Lucrecia Cano Montalvo*',                   //🗝️ACTUALIZAR EN CAMBIO ADMINISTRATIVO
        'Oficina de Servicio Social Unidad OTAY',
        'Teléfono: (664) 607-84-00 Ext. 204',               //🗝️ACTUALIZAR EN CAMBIO ADMINISTRATIVO
        '<serviciosocialotay@tectijuana.edu.mx>',
    ]
)
const flowMenu = addKeyword(['1','Menu', 'menú']).addAnswer(
    [
        '¡Hasta la próxima, Galgo!',
        '*Menú* si tienes mas consultas',
    ]
)
.addAnswer(
    { capture: true, buttons: [{ body: 'Ir a Menú' }] },

    async (ctx, {endFlow }) => {
        if (ctx.body == 'Ir a Menú') //////////CHECAR-------------------
         return endFlow({body: '❌ Su solicitud ha sido cancelada ❌'   // Aquí terminamos el flow si la condición se cumple
        })
        return flowPrincipal()
    }
)  
const flowCrono = addKeyword(['Cronograma','crono','fechas importantes', 'fecha', 'cono']).addAnswer('*SERVICIO SOCIAL*\n_CRONOGRAMA DE ACTIVIDADES_',
    {
        media:'https://www.tijuana.tecnm.mx/wp-content/uploads/2024/08/Cronograma-de-Actividades-del-servicio-social-ago-dic24-1.png'
    }
)
////////////////////////////OPCIONES DE FLUJO DUDAS///////////////////////////
const flow1 =addKeyword ('1').addAnswer(
    [
        '1.-¿Donde puedo realizar mi registro para servicio social?',
            '\nEs necesario realizar el curso de inducción',
            'Ingresa al sitio Oficial de Servicio Social',
            '👉https://sitec.tijuana.tecnm.mx/servicio_social/index.php👈',
            '*Ingresa tu matrícula* y pulsa _Curso de inducción_',
    ]
).addAnswer([
    '\n*1* o *Menú* Para Terminar la consulta'],// el cierre de objeto debe de ser antes de null, para que no se muestre 'menú [objeto]', en el despliegue del mensaje
        null,
        null,
        [flowMenu]
)
 //¿Cuándo inicia el servicio social?
    const flow2 = addKeyword(['2', 'Cuando inicia'])
    .addAnswer(
        [
            '*El periodo actual es: *',
            'AGOSTO 24 - FEBRERO 25', //🗝️ACTUALIZAR CADA SEMESTRE
            '\n*La fecha de inscripción*',
            '5 de agosto al 19 de agosto del 2024', //🗝️ACTUALIZAR CADA SEMESTRE
        ] 
    ).addAnswer([
        '\n*1* o *Menú* Para Terminar la consulta'],
        null,
        null,
        [flowMenu]
    ).addAnswer([
        '*Cronograma* para consultar "Fechas Importantes de Servicio Social"'],
        null,
        null,
        [flowCrono]
    )
    //'¿Cuánto tiempo dura el servicio social?'
    const flow3 = addKeyword(['3'])
    .addAnswer(
        [
            '*6 MESES Y 1 DÍA*', 
            'Cumpliendo como objetivo con 480 Horas',
            '-------------------------------------------------\n',
            'Para calcular la fecha FINAL de tu servicio social',
            'Es 6 meses y 1 día después de la fecha Inicial\n',
            '*Ejemplo*',
            '*Fecha inicial:* _Lunes 05 de Agosto 2024_ *Terminación:* _Jueves 06 de Febrero 2025_',//🗝️ACTUALIZAR CADA SEMESTRE
        ]
    ).addAnswer([
        '\n*1* Para Terminar la consulta'],
        null,
        null,
        [flowMenu]
    )
    //'No aparece el Servicio Social marcado en AMBAR como materia'
    const flow4 = addKeyword('4')
    .addAnswer(
        [
            '1.- Debes acudir con tu coordinador para que lo cargue a Ambar como materia', //CAMBIO DE SITEC A AMBAR
            '2.- También puedes realizar una "constancia de estudios con horario escolar" en línea, donde aparezca _Servicio Social_ en curso\n',
            '_Caso especial y casos comité_',
            '3.- Es importante guardar el comprobante de pago del semestre en curso, y anexarlo en un mismo documento al subir tu kardex a la plataforma, solo en caso de ser necesario', 
        ]
    ).addAnswer([
        '\n*1* o *Menú* Para Terminar la consulta'],
        null,
        null,
        [flowMenu]
    )
    //¿Hasta cuándo tengo para subir los documentos?
    const flow5 = addKeyword('5')
    .addAnswer(
        [
           'CARGA DE DOCUMENTOS',
           '_FASE 1_',
           '23 al 30 de Agosto de 2024', //🗝️ACTUALIZAR CADA SEMESTRE
           'REVISIÓN FASE 1',
           '24 de Agosto del 2024', //🗝️ACTUALIZAR CADA SEMESTRE
           '_Para más información consulta el *Cronograma*_'
        ]
    ).addAnswer([
        '*Cronograma* para consultar fechas importantes de Servicio Social'],
        null,
        null,
        [flowCrono]
    ).addAnswer([
        '\n*1* o *Menú* Para Terminar la consulta'],
        null,
        null,
        [flowMenu]
    )
    // '¿Dónde puedo realizar mi servicio Social?
    const flow6 = addKeyword('6')
    .addAnswer(
        [
           '*BANCO DE DEPENDENCIAS*',
           '\nIngresa al Banco de Dependencias',
           'Puedes seleccionar dependencias Internas y Externas ',
           'https://goo.su/czvxuq', //🗝️ACTUALIZAR CADA SEMESTRE
        ]
    ).addAnswer([
        '\n*1* o *Menú* Para Terminar la consulta'],
        null,
        null,
        [flowMenu]
    )
    //Constancia de liberación
    const flow7 = addKeyword('7')
    .addAnswer(
        [
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
        ]
    ).addAnswer(

        [
            '\n*1* o *Menú* Para Terminar la consulta',
        ], 
        null,
        null,
        [flowMenu]
    )
    //'Me llegó un correo para darme de baja, ¿qué debo de hacer?'
    const flow8 = addKeyword(['8'])
    .addAnswer(
        [
           'Debes de mandar un correo a <serviciosocial@tectijuana.edu.mx> con tus datos:',
           '*Nombre*',
           '*Número de control*', 
           '*Carrera*',
           '*Asunto:*',
           '_Darme de Baja_, junto con una carta de motivos por los cuales te quieres dar de baja del período pasado y continuar en este período (AGO 24 -FEB 25) con tus datos y firmada', //🗝️ACTUALIZAR CADA SEMESTRE
           '_Continuar en el periodo anteriormente Registrado_, mandar un correo con tus datos y notificar que quieres continuar',
           '*Unidad Perteneciente* (Tomas Aquino u Otay)',
        ]
    ).addAnswer(
        
        [
            '\n*1* o *Menú* Para Terminar la consulta'
        ], 
        null,
        null,
        [flowMenu]
    )
    
    const flow10 = addKeyword(['10', '¿Dónde puedo obtener mi seguro facultativo?'])
    .addAnswer(
        [
           'Si ya cuentas con seguro social por parte de padres o trabajo, no es necesario renunciar a esta, es válido, solo subir constancia de vigencia',
           'Solicitar la constancia del seguro social para entrar a la plataforma del IMMS',
           '👉https://goo.su/bS44Mj👈',
           'En caso de vigencia: BAJA',
           'Solicitar en servicios escolares, dada de ALTA en IMSS por la institución',
           'Llenar Formulario de 24h a 72h de respuesta',
           '👉👈', //🗝️ACTUALIZAR CADA SEMESTRE--------------------------------------------
        ]
    ).addAnswer(
        
        [
            '\n*1* o *Menú* Para Terminar la consulta'
        ], 
        null,
        null,
        [flowMenu]
    )
    const flow9 = addKeyword(['9', 'Ya subí documentos iniciales, pero no puedo subir la primera fase'])
    .addAnswer(
        [
           'Debes de notificar vía correo electrónico, que subiste los documentos iniciales, es fundamental seguir la misma cadena de correo electrónico',
           'Si ya mandaste correo electrónico debes esperar de 1 a 3 días hábiles para recibir respuesta',           
           'Si ya pasó más tiempo, puedes volver a mandar correo reafirmando que ya subiste tus documentos, es fundamental darle seguimiento a tu expediente vía correo electrónico.',
        ]
    ).addAnswer(
        
        [
            '\n*1* o *Menú* Para Terminar la consulta'
        ], 
        null,
        null,
        [flowMenu]
    )
/////////////////////////////////////////////////////////////////////////////

//flujo dudas donde se vacían todas las preguntas más frecuentes del servicio social
const flowDudas = addKeyword(['Dudas', 'duda', 'dud'])
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
        {capture: true},
        async (ctx, {gotoFlow, fallback, flowDynamic}) => {
            if (!['1', "2", "3", "4", "5", "6", "salir"].includes(ctx.body)) { //si no es una de  las opciones 
                return fallback(  // retornar al usuario validando solo lo que queremos que introduzca el usuario
                    "Por favor elige un número dentro del menú"
                );
            }
            switch (ctx.body) {
                case '1':
                    return gotoFlow (flow1);
                case '2':
                    return gotoFlow (flow2);
                case '3':
                    return gotoFlow (flow3);
                case '4':
                    return gotoFlow(flow4);
                case '5':
                    return gotoFlow(flow5);
                case '6':
                    return gotoFlow(flow6);
                case '5':
                    return gotoFlow(flow7);
                case '6':
                    return gotoFlow(flow8);
                case '5':
                    return gotoFlow(flow9);
                case '6':
                    return gotoFlow(flow10);
                case 'salir':
                    return await flowDynamic ('saliendo, ¡bye!');
            }
        }
        
    )

//FLUJO HIJO documentación del servicio social

const flowDocs = addKeyword([EVENTS.ACTION]).addAnswer(
    [
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
        'https://youtu.be/OCyEh-ACckA'

    ]).addAnswer(['\n*1* Para Terminar Consulta'],
    null,
    null,
    [flowMenu] 
)

///////////////////////FLUJO VIDEO DE SERVICIO SOCIAL/////////////////////////////////////

const flowVideo = addKeyword ('video', 'Vido', 'vidio','vidrio' ).addAnswer(
    [
        'Si tienes dudas respecto al servicio social, consulta el video de inducción\n',
        'Donde explicamos cuestionamientos generales que los alumnos suelen tener',
    ])
    .addAnswer('VIDEO DE INDUCCIÓN SERVICIO SOCIAL ITT', 
                '\n https://youtu.be/OCyEh-ACckA'
    )
    .addAnswer(['\n*1* Para Terminar la consulta'],
        null,
        null, 
        [flowMenu]
    )

//FLUJO HIJO
const flowFechas = addKeyword(['fechas', 'fecha', 'tiempo']).addAnswer(
    [   '*Fechas importantes para el Servicio Social*\n', 
        'REGISTRO AL SERVICIO SOCIAL', 
        'Inscripción del 5 de agosto al 19 de agosto del 2024\n',
        'Apertura del expediente', 
        '',
    
    ]
).addAnswer(['\n*1* Para Terminar la consulta'],
    null,
    null, 
    [flowMenu]
)

///////////////////////////////////

//chatgpt

const flowGPT = addKeyword (['documentos servicio social', 'preguntas', '5']) 
.addAnswer ('¿Cuáles son tus dudas respecto al servicio social?', null, async ()=>{
        await ChatGPTInstance.handleMsgChatGPT(PROMP)
})
.addAnswer(['Específica el que documento tu duda,',
    '\nPunto (número) dónde tienes problemas del llenado'],
    {capture:true}, async (ctx, {flowDynamic}) => {
        const respuesta = await ChatGPTInstance.handleMsgChatGPT(ctx.body);
        const mensaje = respuesta.text; // aquí se encuentra la respuesta
       if (ctx.body.toString() !=='terminar consulta') {
        await flowDynamic(mensaje);
       }
    }
);
/*
const pathConsultas = path.join (__dirname, "mensajes", 'promptConsultas.txt')
const promptConsultas = fs.readFileSync(pathConsultas, 'utf8')

const flowPreguntas = addKeyword (['documentos servicio social', 'preguntas']) 
.addAnswer ('¿Cuáles son tus dudas respecto al servicio social?', {capture:true}, async (ctx, ctxFn) =>{
    const prompt = promptConsultas
    const consulta = ctx.body
    const answer = await chat (prompt, consulta)
    await ctxFn.flowDynamic (answer.content)
})
*/


   ////////////////////////// FLUJO MENU DE SERVICIO SOCIAL PRINCIPAL /////////////////////////////

 //const MenuPrincipal = addKeyword (EVENTS.WELCOME) //Dar la Bienvenida al usuario con cualquier mensaje
const MenuPrincipal = addKeyword ('1')

 //const MenuPrincipal = addKeyword ('Servicio Social')
    .addAnswer('¿Como puedo ayudarte?😁')
    .addAnswer(
        [
            'Te comparto los siguientes links de interés sobre el proceso\n',
            '                             *SERVICIO SOCIAL*',
            '      _Departamento De Gestión Tecnológica Y Vinculación_\n',
            '🧾 *1* Para ver la documentación',
            '🎬 *2* Para Dudas Generales (Video)',
            '👉 *3* Fechas Importantes del Servicio Social',
            '🤔 *4* Dudas Frecuentes de los alumnos',
            '📂 *5* Consulta respecto a documentos de servicio social',
            '👩‍💻 *6* CONTACTO Unidad Tomas Aquino y OTAY '
        ],
        {capture: true},
        async (ctx, {gotoFlow, fallback, flowDynamic}) => {
            if (!['1', "2", "3", "4", "5", "6", "salir"].includes(ctx.body)) { //si no es una de  las opciones 
                return fallback(  // retornar al usuario validando solo lo que queremos que introduzca el usuario
                    "Por favor elige un número dentro del menú"
                );
            }
            switch (ctx.body) {
                case '1':
                    return gotoFlow (flowDocs);
                case '2':
                    return gotoFlow (flowVideo);
                case '3':
                    return gotoFlow (flowFechas);
                case '4':
                    return gotoFlow(flowDudas);
                case '5':
                    return gotoFlow(flowGPT);
                case '6':
                    return gotoFlow(flowContacto);
                case 'salir':
                    return await flowDynamic ('saliendo, ¡bye!');

            }
        }
    );
//module.exports= MenuPrincipal;
module.exports={
    MenuPrincipal,
    flowContacto, 
    flowCrono, 
    flowDocs, 
    flowDudas, 
    flowFechas, 
    flowGPT, 
    flowVideo, 
    flow1, 
    flow2, 
    flow3, 
    flow4, 
    flow5, 
    flow6, 
    flow7, 
    flow8, 
    flow9, 
    flow10
}

/*export default {
    MenuPrincipal,
    flowContacto, 
    flowCrono, 
    flowDocs, 
    flowDudas, 
    flowFechas, 
    flowGPT, 
    flowVideo, 
    flow1, 
    flow2, 
    flow3, 
    flow4, 
    flow5, 
    flow6, 
    flow7, 
    flow8, 
    flow9, 
    flow10
}*/
