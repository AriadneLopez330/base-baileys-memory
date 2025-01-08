import { addKeyword } from '@builderbot/bot';
import { menuGeneral } from './menuPrincipalFlow.js';
///////////////////////////////
//FLUJO PRIMARIO
const flowGracias = addKeyword(['gracias']).addAnswer(
  [
    'De nada',
    'Fue un placer',
    'Soy tu Asistente Galgo!!\n, _Aún estoy mejorando para brindarte la mejor ayuda_',
    '🙌Puedes ecribir *_menú_* para más ayuda🫡',
  ],
  null,
  null,
  [menuGeneral],
);

export { flowGracias };
