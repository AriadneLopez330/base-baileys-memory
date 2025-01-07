import { addKeyword, EVENTS } from '@builderbot/bot';
import { handleQueue } from '../utils/chatgpt.js';
import { userQueues, userLocks } from '../utils/state.js';

const gptFlow = addKeyword(EVENTS.WELCOME).addAction(
  async (ctx, { flowDynamic, state, provider }) => {
    const userId = ctx.from;

    if (!userQueues.has(userId)) {
      userQueues.set(userId, []);
    }

    const queue = userQueues.get(userId);
    queue.push({ ctx, flowDynamic, state, provider });

    if (!userLocks.get(userId) && queue.length === 1) {
      await handleQueue(userId);
    }
  },
);

export { gptFlow };
