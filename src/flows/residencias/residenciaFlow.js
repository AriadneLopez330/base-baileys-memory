import { addKeyword } from '@builderbot/bot';
import { menuPrincipalFlow } from '../menuPrincipalFlow.js';
// Definir respuestasR fuera del flujo para que sea accesible en todos los handlers
const respuestasR = {
  '1': [
    'POLIZA: VG-TEC-183-05'
  ],
  '2': ['✉️Carta de presentación',
    'https://docs.google.com/forms/d/e/1FAIpQLSc1L0G9fsUeM4AAAKAiMKVoIgN34ODKBZ6pIiKMXam-utaELQ/viewform',
  ],
  '3': [
    '🏢Banco de proyectos para residencias profesionales',
    'https://docs.google.com/spreadsheets/d/1ltEp3P3uMU77sVTjykXy0LUJ9mSae5um/edit?usp=sharing&ouid=113306876051632131679&rtpof=true&sd=true',
  ],
  '4': [
    '*Residencias Profesionales*',
    '_Departamento De Gestión Tecnológica Y Vinculación_\n',
    'M.A. Karen Zavala Rodríguez',
    'Correo: residencias@tectijuana.edu.mx',
    'Teléfono: (664)6 07 84 23 ext. 124'
  ]
};

export const flowResidencia = addKeyword(['3', 'residencias'])
  .addAnswer('Oficina Residencias Profesionales')
  .addAnswer(
    [
      'Te comparto los siguientes links de interés sobre el proceso\n',
      '           *Residencias Profesionales*',
      '_Departamento De Gestión Tecnológica Y Vinculación_\n',
      '📌 *1* Póliza',
      '🧾 *2* Carta presentación',
      '📂 *3* Banco de proyectos',
      '👩‍💻 *4* CONTACTO Unidad Tomas Aquino',
    ]
  )
  .addAnswer(
    'Por favor, escribe el número de tu opción que deseas consultar:',
    { capture: true },
    async (ctx, { flowDynamic }) => {
      const opcion = ctx.body.trim();
      
      if (respuestasR[opcion]) {
        return flowDynamic(respuestasR[opcion]);
      }
      
      return flowDynamic(['⚠️ Por favor, selecciona una opción válida (1-4)']);
    }
  )
  .addAnswer(
    [
      '⭕ Por favor, escribe el número de tu opción que deseas consultar:',
      '🟢 Escribe un número (1-4)', 
      '🔴 "menu" para volver al menú dudas frecuentes',
      '🟡 "salir" para volver al menú principal'
    ],
    { capture: true },
    async (ctx, { gotoFlow, flowDynamic, fallBack }) => {
      try {
        const opcion = ctx.body.trim();
        
        if (opcion.toLowerCase() === 'menu') {
          await gotoFlow(flowResidencia);
          return;
        }
        
        if (opcion.toLowerCase() === 'salir') {
          await gotoFlow(menuPrincipalFlow);
          return;
        }
        
        if (respuestasR[opcion]) {
          await flowDynamic(respuestasR[opcion]);
        } else {
          await flowDynamic(['⚠️ Por favor, selecciona una opción válida (1-4)']);
        }
      } catch (error) {
        console.error('Error en el segundo handler:', error);
        await fallBack();
      }
    }
  );