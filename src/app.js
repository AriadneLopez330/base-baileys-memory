import { createBot, createProvider, createFlow, addKeyword } from '@builderbot/bot'
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { PORT } from './config.js'
import { flowCrono } from './flows/serviciosSociales/ssocialflow.js'
import { menuSocial } from './flows/serviciosSociales/menuSocial.js'
import { visIndus } from './flows/visitasIndustriales/visitasmenu.js'
import { flowMenuDudas } from './flows/serviciosSociales/menuDudasFlow.js'
import { flowResidencia } from './flows/residencias/residenciaFlow.js'
import { menuPrincipalFlow } from './flows/menuPrincipalFlow.js'
import { gptFlow } from './flows/serviciosSociales/gptFlow.js'
import { flowGracias } from './flows/graciasFlow.js'


/////////////////////////////////////////////////////////////////////////////////////////

const main = async () => {
    const adapterFlow = createFlow([
    menuPrincipalFlow,
    menuSocial,
    visIndus,
    flowGracias,
    flowMenuDudas,
    flowResidencia,
    flowCrono,
    gptFlow
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