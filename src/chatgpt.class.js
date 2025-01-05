require('dotenv').config(); // es necesario instalar la libreria *npm i dotenv

//clse independiente
class ChatGPTClass {
  queue = [];
  optionsGPT = { model: "gpt-3.5-turbo" }; //modelo que se esta utilizando
  openai = undefined; //inicaliza openai

  //constructor para mandar a llamar la base de datos y al proveerdor
  constructor() {
    this.init().then();
  }

  //*****Funcion que inicializa el proceso de consulta

  init = async () => {
    const { ChatGPTAPI } = await import("chatgpt"); //uso de libreria instalada //npm install openai
   this.openai = new ChatGPTAPI(
    // Objeto que contiene la API KEY 
      {
        apiKey: process.env.OPENAI_API_KEY  //En lugar de colocar la llave de acceso es mejor colocar variables de entorno (.env) y busca la variable "OPENAI_API_KEY "
      }
    );
  };
  
  /**
   * MANEJADOR DE MENSAJES de chatgpt, su funcionalidad es el encargado de mandar los mensajes a whatsapp
   * @param {handleMsgChatGPT} ctx 
   * en lugar de ctx se cambio a body para el caso de apliacion y el mensaje del usuario
   */

  handleMsgChatGPT = async (body) => {
    const interaccionChatGPT = await this.openai.sendMessage(body, {    // consta que almacena el resultado que chatgpt proporciona
      conversationId: !this.queue.length                                // this.openai.sendMessage = ir a chatgpt y escribir un mensaje, este mensaje del usuario se almacena body
        ? undefined                                                     //conversationId  = cada usuario tiene un ID para regitrar conversacion 
        : this.queue[this.queue.length - 1].conversationId,
      parentMessageId: !this.queue.length
        ? undefined
        : this.queue[this.queue.length - 1].id,
    });
// se manda la interaccion al array de queue
    this.queue.push(interaccionChatGPT);
   return interaccionChatGPT                                            // retornar la interaccion hacia afuera la conversacion 
  };
}

module.exports = ChatGPTClass;
