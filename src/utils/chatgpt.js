import "dotenv/config";
import { toAsk } from "@builderbot-plugins/openai-assistants";
import { typing } from "./presence.js";
import { ASSISTANT_ID } from "../config.js";
import { userQueues, userLocks } from "./state.js";
const processUserMessage = async (ctx, { flowDynamic, state, provider }) => {
  await typing(ctx, provider);
  const response = await toAsk(ASSISTANT_ID, ctx.body, state);

  const chunks = response.split(/\n\n+/);
  for (const chunk of chunks) {
      const cleanedChunk = chunk.trim().replace(/【.*?】[ ] /g, "");
      await flowDynamic([{ body: cleanedChunk }]);
  }
};

const handleQueue = async (userId) => {
  const queue = userQueues.get(userId);

    // Verificación de la cola
    if (!queue) {
        console.error(`Queue not found for user ${userId}`);
        return;
      }
  
  if (userLocks.get(userId)) {
      return;
  }

  while (queue.length > 0) {
      userLocks.set(userId, true);
      const { ctx, flowDynamic, state, provider } = queue.shift();
      try {
          await processUserMessage(ctx, { flowDynamic, state, provider });
      } catch (error) {
          console.error(`Error processing message for user ${userId}:`, error);
      } finally {
          userLocks.set(userId, false);
      }
  }

  userLocks.delete(userId);
  userQueues.delete(userId);
};

export { handleQueue };