import { createBot, createProvider, createFlow } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys';
import { PORT } from './config.js';
// import { gptFlow } from './flows/gptFlow.js';
import { menuPrincipalFlow } from './flows/menuPrincipalFlow.js';
// import { MongoDB } from '@builderbot/database-mongo'
// import { MONGO_DB_URI, MONGO_DB_NAME } from './config.js'

const main = async () => {
  const adapterFlow = createFlow([ menuPrincipalFlow]);
  const adapterProvider = createProvider(Provider);

  // BASE DE DATOS JSON
  const adapterJSONDB = new Database({ filename: './db.json' });

  // BASE DE DATOS MONGO
  // const adapterMongoDB = new MongoDB({
  //     dbUri: MONGO_DB_URI,
  //     dbName: MONGO_DB_NAME,
  // })
  // console.log(adapterMongoDB)

  const { handleCtx, httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterJSONDB,
  });

  // ENDPOINT PARA ENVIAR MENSAJES
  // https://personal-assitant.up.railway.app/v1/messages
  adapterProvider.server.post(
    '/v1/messages',
    handleCtx(async (bot, req, res) => {
      const { number, message, urlMedia } = req.body;
      await bot.sendMessage(number, message, { media: urlMedia ?? null });
      return res.end('sended');
    }),
  );

  httpServer(+PORT);
};

main();
