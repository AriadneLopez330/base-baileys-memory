import { createBot, createProvider, createFlow, addKeyword } from '@builderbot/bot'
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { PORT } from './config.js'
//import { welcomeFlow } from './Departamento/wellcomeFlow.js'
//import { flowresidencia } from './Departamento/residenciaFlow.js'
//import { menuSocial } from './flows/serviciosSociales/menuSocial.js'
import { menuPrincipalFlow } from './flows/menuPrincipalFlow.js'
import { menuSocial } from './flows/serviciosSociales/menuSocial.js'
import { visIndus } from './flows/visitasIndustriales/visitasmenu.js'
import { flowMenuDudas } from './flows/serviciosSociales/menuDudasFlow.js'

/////////////////////////////////////////////////////////////////////////////////////////

//FLUJO PRIMARIO
    const flowGracias = addKeyword(['gracias', 'grac', 'seria todo, gracias']).addAnswer(
        [
            'De nada',
            'Fue un placer',
            'Soy tu Asistente Galgo!!\n, _Aún estoy mejorando para brindarte la mejor ayuda_',
            '🙌Puedes ecribir *_menú_* para más ayuda🫡'
        ],
        null, null, [menuPrincipalFlow]
    )
    

const main = async () => {
    const adapterFlow = createFlow([
    menuPrincipalFlow,
    menuSocial,
    visIndus,
    flowGracias,
    flowMenuDudas
    ])
    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database({ filename: 'db.json' })

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    httpServer(+PORT)
}

main()