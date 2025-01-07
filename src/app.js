import { createBot, createProvider, createFlow } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys';
import { PORT } from './config.js';
import { welcomeFlow } from './flows/wellcomeFlow.js';
import { menuGeneral } from './flows/menuGeneralFlow.js';
// import { MongoDB } from '@builderbot/database-mongo'
// import { MONGO_DB_URI, MONGO_DB_NAME } from './config.js'

const main = async () => {
  const adapterFlow = createFlow([welcomeFlow, menuGeneral]);
  const adapterProvider = createProvider(Provider);

  // BASE DE DATOS JSON
  const adapterJSONDB = new Database({ filename: ('./db.json') });

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

  adapterProvider.server.post(
    '/v1/messages',
    handleCtx(async (bot, req, res) => {
      const { number, message, urlMedia } = req.body;
      await bot.sendMessage(number, message, { media: urlMedia ?? null });
      return res.end('sended');
    }),
  );

  adapterProvider.server.post(
    '/v1/register',
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body;
      await bot.dispatch('REGISTER_FLOW', { from: number, name });
      return res.end('trigger');
    }),
  );

  adapterProvider.server.post(
    '/v1/samples',
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body;
      await bot.dispatch('SAMPLES', { from: number, name });
      return res.end('trigger');
    }),
  );

  adapterProvider.server.post(
    '/v1/blacklist',
    handleCtx(async (bot, req, res) => {
      const { number, intent } = req.body;
      if (intent === 'remove') bot.blacklist.remove(number);
      if (intent === 'add') bot.blacklist.add(number);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ status: 'ok', number, intent }));
    }),
  );

  httpServer(+PORT);
};

main();
