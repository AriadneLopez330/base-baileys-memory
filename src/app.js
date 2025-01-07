import { createBot, createProvider, createFlow } from '@builderbot/bot'
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { PORT } from './config.js'
import { welcomeFlow } from './flows/wellcomeFlow.js'

/////////////////////////////////////////////////////////////////////////////////////////
const flowresidencia = addKeyword (['3', 'residenica']).addAnswer ('POLIZA: VG-TEC-183-05')
.addAnswer('Encargada de Residencias Profesionales del Departamento de Gestión Tecnológica y Vinculación')
.addAnswer('M.A. Karen Zavala Rodríguez')
.addAnswer('Correo: residencias@tectijuana.edu.mx')
.addAnswer('Teléfono: (664)6 07 84 23 ext. 124')
.addAnswer('✉️Carta de presentacion: https://docs.google.com/forms/d/e/1FAIpQLSc1L0G9fsUeM4AAAKAiMKVoIgN34ODKBZ6pIiKMXam-utaELQ/viewform')
.addAnswer('🏢Banco de proyectos para residencias profecionales: https://docs.google.com/spreadsheets/d/1ltEp3P3uMU77sVTjykXy0LUJ9mSae5um/edit?usp=sharing&ouid=113306876051632131679&rtpof=true&sd=true')
 
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



const main = async () => {
    const adapterFlow = createFlow([welcomeFlow, flowresidencia, menuGeneral, flowGracias])
    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database({ filename: 'db.json' })

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    adapterProvider.server.post(
        '/v1/messages',
        handleCtx(async (bot, req, res) => {
            const { number, message, urlMedia } = req.body
            await bot.sendMessage(number, message, { media: urlMedia ?? null })
            return res.end('sended')
        })
    )

    adapterProvider.server.post(
        '/v1/register',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('REGISTER_FLOW', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/samples',
        handleCtx(async (bot, req, res) => {
            const { number, name } = req.body
            await bot.dispatch('SAMPLES', { from: number, name })
            return res.end('trigger')
        })
    )

    adapterProvider.server.post(
        '/v1/blacklist',
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body
            if (intent === 'remove') bot.blacklist.remove(number)
            if (intent === 'add') bot.blacklist.add(number)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ status: 'ok', number, intent }))
        })
    )

    httpServer(+PORT)
}

main()




