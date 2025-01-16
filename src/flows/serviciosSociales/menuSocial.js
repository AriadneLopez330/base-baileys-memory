import { addKeyword } from '@builderbot/bot';
import { flowMenuDudas } from './menuDudasFlow.js';
import { menuPrincipalFlow } from '../menuPrincipalFlow.js';
//import { flowCrono } from './ssocialflow.js';
//import { duda1, duda2, duda3, duda4, duda5, duda6, duda7, duda8, duda9, duda10 } from './dudasFrecuentes/dudasFlows.js';
// O Opción 2: Importar todo como un objeto
//import * as flows from './ssocialflow.js';
////////////////////////////Menu principal de servicio social///////////////////////////////////////
export const menuSocial = addKeyword(['social', 'servicio social'])
  //const MenuPrincipal = addKeyword ('Servicio Social')
  .addAnswer('¿Como puedo ayudarte?😁')
  .addAnswer(
    [
      'Te comparto los siguientes links de interés sobre el proceso\n',
      '                             *SERVICIO SOCIAL*',
      '_Departamento De Gestión Tecnológica Y Vinculación_\n',
      '🧾 *1* Para ver la documentación',
      '🎬 *2* Para Dudas Generales (Video)',
      '👉 *3* Fechas Importantes del Servicio Social',
      '🤔 *4* Dudas Frecuentes de los alumnos',
      '📂 *5* Consulta respecto a documentos de servicio social',
      '👩‍💻 *6* CONTACTO Unidad Tomas Aquino y OTAY ',
    ])
    .addAnswer(
      'Por favor, escribe el número de tu opción que deseas consultar:',
      { capture: true},
      async (ctx, {flowDynamic, gotoFlow, fallback}) => {
        const opcion = ctx.body.trim();
        
        if (opcion === '4') {
          await flowDynamic('Accediendo a dudas frecuentes...');
          ctx.body = 'ver_dudas';  // Cambiamos el body para activar el flujo correcto
          return gotoFlow(flowMenuDudas);
        }
      //para las otras opciones, utiliza el objeto respuestas
        const respuestas = {
          '1': [
            '*DOCUMENTACIÓN DEL SERVICIO SOCIAL*',
            'https://www.tijuana.tecnm.mx/servicio-social/', //🗝️modificar url en cambio de documentacion🗝️
            '\n\n*Formatos para Proceso de Servicio Social*',
            '\n📂Manual de apertura de expediente✒️',
            '\n(*FASE 1*)',
            'https://www.tijuana.tecnm.mx/wp-content/uploads/2024/08/MANUAL-1-AGO-DIC-2024-REVISADO.pdf',//🗝️modificar url en cambio de documentacion🗝️
            '\n(*FASE 2*)',
            'https://www.tijuana.tecnm.mx/wp-content/uploads/2024/08/MANUAL-2-AGO2024-REVISADO.pdf',//🗝️modificar url en cambio de documentacion🗝️
            '\n*Documentación de Curso de Inducción*',
            'https://view.genially.com/663d4ada521f6000143c2380/presentation-guia-de-induccion-servicio-social-del-tecnologico',//🗝️modificar url en cambio de documentacion🗝️
            '\nVideo de Inducción, Preguntas Generales del servicio social',
            'https://youtu.be/OCyEh-ACckA',
          ],
          '2': [
            'Si tienes dudas respecto al servicio social, consulta el video de inducción\n',
            '\n Video Inducción del Servicio Social ITT',
            'https://youtu.be/OCyEh-ACckA',
          ],
          '3': [
            '*FECHAS IMPORTANTES*',
            'Inscripción: del 5 de agosto al 19 de agosto del 2024', //🗝️modificar fecha cada semestre🗝️
            'Periodo: Septiembre - Diciembre 2024' //🗝️modificar fecha cada semestre🗝️
          ],
          '5': [
            '--------UNIDAD TOMAS AQUINO-----------\n',
            '*Nayeli Irene Fernández González*', //🗝️ACTUALIZAR EN CAMBIO ADMINISTRATIVO
            'Oficina de Servicio Social Unidad Tomás Aquino',
            'Teléfono: (664) 607-84-00 Ext. 123', //🗝️ACTUALIZAR EN CAMBIO ADMINISTRATIVO
            'serviciosocial@tectijuana.edu.mx',
            '\n------------UNIDAD OTAY---------------',
            '\n*Lucrecia Cano Montalvo*', //🗝️ACTUALIZAR EN CAMBIO ADMINISTRATIVO
            'Oficina de Servicio Social Unidad OTAY',
            'Teléfono: (664) 607-84-00 Ext. 204', //🗝️ACTUALIZAR EN CAMBIO ADMINISTRATIVO
            '<serviciosocialotay@tectijuana.edu.mx>',

          ]
        };
        if (respuestas[opcion]) {
          return flowDynamic(respuestas[opcion]);
        }
  
        return fallback('⚠️ Por favor, selecciona una opción válida (1-5)');
      }
    )
    .addAnswer(
      [
        '⭕ Por favor, escribe el número de tu opción que deseas consultar:',
        '🟢 Escribe un número (1-5)', 
        '🔴 "menu" para volver al menú dudas frecuentes',
        '🟡 "salir" para volver al menú principal'
      ],
      { capture: true },
      async (ctx, { gotoFlow }) => {
        if (ctx.body.toLowerCase() === 'menu') {
          return gotoFlow(menuSocial);
        }
        else if (ctx.body.toLowerCase() === 'salir') {
            return gotoFlow(menuPrincipalFlow);
        }
      }
    );