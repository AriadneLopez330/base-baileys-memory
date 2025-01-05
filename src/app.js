const { createBot, createProvider, createFlow, addKeyword, EVENTS, addAnswer, ProviderClass } = require('@bot-whatsapp/bot')
const QRPortal = require('@bot-whatsapp/portal') //DESPLIEGUE DE GENERADOR QR EN UNA PAGUINA WEB
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
//const MockAdapter = require('@bot-whatsapp/database/mock');//adaptador de memoría
//const MongoAdapter = require('@bot-whatsapp/database/mongo')//adaptador base de datos a mongoDB
const JsonAdapter = require ('@bot-whatsapp/database/json');
const portal_http = require('@bot-whatsapp/portal');
//////const ChatGPTClass = require('./chatgpt.class'); //mandar a llamar a la clase ChatGPTClass
const { PROMP } = require('./promp');
//const chat = require ('./chatgpt')
const { contentwarehouse } = require('googleapis/build/src/apis/contentwarehouse');
const { chat } = require('googleapis/build/src/apis/chat');
const { default: visitas } = require('./visitas');
const SSOCIAL = require('../SSOCIAL');//IMPORTACION DE SERVIOCIO SOCIAL
//import SSOCIAL from ('./SSOCIAL')
//const path = require("path")
//const fs = require("fs")
//import SSOCIAL from './SSOCIAL';

//////const ChatGPTInstance = new ChatGPTClass();


///////////////////////////////////////////✨FLUJO PRIMARIO✨////////////////////////////////////////

/*const flowPrincipal = addKeyword(EVENTS.WELCOME) //Dar la bienvenida al usuario con cualquier mensaje
    .addAnswer('😊 Hola, bienvenido a *Galgo Asistente*')
    .addAnswer('¿Como puedo ayudarte?😁')
    .addAnswer(
        [
            'Te comparto los siguientes links de interés sobre el proceso\n',
            '                             *SERVICIO SOCIAL*',
            '      _Departamento De Gesión Tecnologíca Y Vinculación_\n',
            '🧾 *Doc* Para ver la documentación',
            '🎬 *Video*  Para Dudas Generales ',
            '👉 *Fechas* Importantes del Servicio Social',
            '🤔 *Duda* Frecuentes de los alumnos',
            '*👩‍💻Contacto* Unidad Tomas Aquino y OTAY '
        ],
        null,
        null,
        [flowDocs,flowVideo, flowFechas,flowDudas, flowContacto]
    )*/
   ///////////////////////////////////////////////////////////////
    /**
     * FLUJO DE LISTA DE LOS DEPARTAMENTOS
     */
    //const menuOficina = addKeyword ('departamento').addAnswer ('')

/////////////////////////////////////////////////////////////////////////////////////////
const residencia = addKeyword (['3', 'residenica']).addAnswer ('POLIZA: -------')
.addAnswer('')
 
///////////////////flujo primario para el departamento de manera general///////////////////////

const menuGeneral = addKeyword (EVENTS.WELCOME)
    .addAnswer ('Menu departamento')
    .addAnswer (['1-.Servicio Social', '2-.Visitas Industiales', '3-.Residencias (Poliza)'],
        {capture: true},
        async (ctx, {gotoFlow, fallback, flowDynamic}) => {
            if (!['1', "2", "3", "salir"].includes(ctx.body)) { //si no es una de  las opciones 
                return fallback(  // retornar al usuario validando solo lo que queremos que introduzca el usuario
                    "Por favor elige un número dentro del menú"
                );
            }
            switch (ctx.body) {
                case '1':
                    return gotoFlow (SSOCIAL.MenuPrincipal)
                    //return gotoFlow (require ('./SSOCIAL'));
                case '2':
                    return gotoFlow (require ('./visitas'));
                case '3':
                    return gotoFlow ();
                case 'salir':
                    return await flowDynamic ('saliendo, ¡bye!');

            }
        }
    )


    ///////////////////////////////
//FLUJO PRIMARIO
    const flowGracias = addKeyword(['gracias', 'grac', 'seria todo, gracias']).addAnswer(
        [
            'De nada',
            'Fue un placer',
            'Soy tu Asistente Galgo!!\n, _Aún estoy mejorando para brindarte la mejor ayuda_',
            '🙌Puedes ecribir *_menú_* para más ayuda🫡'
        ],
        null, null, [menuGeneral]
    )


/*const main = async () => {
    //const adapterDB = new MockAdapter()//adaptador en memoria
    const adapterDB = new MongoAdapter({
        dburi: process.env.MONGO_DB_URI,
        //dburi: 'mongodb://0.0.0.0:27017',
        dbName: 'GALGO_BD'
    })*/
const main = async () => {
    const adapterDB = new JsonAdapter(
        {
            filename: 'BaseDatos.json'
        }
    )
    const adapterFlow = createFlow([ flowGracias, /*flowCrono, flowContacto,*/ menuGeneral]) //Clases principales
    const adapterProvider = createProvider(BaileysProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortal()//DESPLIEGUE DE GENERADOR QR EN UNA PAGUINA WEB
}

main()

