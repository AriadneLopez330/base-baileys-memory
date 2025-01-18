import { addKeyword } from '@builderbot/bot';
import { menuPrincipalFlow } from '../menuPrincipalFlow.js';
import { flowGracias } from '../graciasFlow.js';

// Definir respuestasR fuera del flujo
const respuestasR = {
  '1': [
    'POLIZA: VG-TEC-183-05'
  ],
  '2': ['✉️Carta de presentación',
    'https://docs.google.com/forms/d/e/1FAIpQLSc1L0G9fsUeM4AAAKAiMKVoIgN34ODKBZ6pIiKMXam-utaELQ/viewform'
  ],
  '3': [
    '🏢Banco de proyectos para residencias profesionales',
    'https://docs.google.com/spreadsheets/d/1ltEp3P3uMU77sVTjykXy0LUJ9mSae5um/edit?usp=sharing&ouid=113306876051632131679&rtpof=true&sd=true'
  ],
  '4': [
    '*Residencias Profesionales*',
    '_Departamento De Gestión Tecnológica Y Vinculación_\n',
    'M.A. Karen Zavala Rodríguez\nCorreo: residencias@tectijuana.edu.mx\nTeléfono: (664)6 07 84 23 ext. 124'
  ]
};

export const flowResidencia = addKeyword(['residencias'])
  .addAnswer('Oficina Residencias Profesionales')
  .addAnswer([
    'Te comparto los siguientes links de interés sobre el proceso\n',
    '           *Residencias Profesionales*',
    '_Departamento De Gestión Tecnológica Y Vinculación_\n',
    '📌 *1* Póliza',
    '🧾 *2* Carta presentación',
    '📂 *3* Banco de proyectos',
    '👩‍💻 *4* CONTACTO Unidad Tomas Aquino',
  ])
  .addAnswer(
    'Por favor, escribe el número de tu opción que deseas consultar:',
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const opcion = ctx.body.trim();
      
      if (respuestasR[opcion]) {
        await flowDynamic(respuestasR[opcion]);
      } else {
        await flowDynamic(['⚠️ Por favor, selecciona una opción válida (1-4)']);
      }
    }
  )
  .addAnswer([
    '*¿Qué deseas hacer?*',
    '',
    '1️⃣ Seguir en menú Residencias',
    '2️⃣ Menú Principal',
    '3️⃣ Finalizar conversación'
  ])
  .addAnswer(
    '_Responde con el número de tu elección_',
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic }) => {
      const opcion = ctx.body.trim().toLowerCase();
      
      // Primero mostramos el mensaje de transición
      if (opcion === '1' || opcion === 'menu') {
        await flowDynamic('↩️ Volviendo al menú de Residencias...');
        return gotoFlow(flowResidencia);
      }
      
      if (opcion === '2' || opcion === 'salir') {
        await flowDynamic('↩️ Volviendo al menú Principal...');
        return gotoFlow(menuPrincipalFlow);
      }
      if (opcion === '3') {
        return gotoFlow(flowGracias);
      }

      // Si la opción no es válida
      await flowDynamic('⚠️ Opción no válida, por favor intenta de nuevo');
      return gotoFlow(flowResidencia);
    }
  );