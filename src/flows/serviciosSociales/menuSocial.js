import { addKeyword } from '@builderbot/bot';
import { flowMenuDudas } from './menuDudasFlow.js';
import { menuPrincipalFlow } from '../menuPrincipalFlow.js';
import { flowCrono } from './ssocialflow.js';
import { gptFlow } from './gptFlow.js';
import { flowGracias } from '../graciasFlow.js';
//import { duda1, duda2, duda3, duda4, duda5, duda6, duda7, duda8, duda9, duda10 } from './dudasFrecuentes/dudasFlows.js';
// O Opción 2: Importar todo como un objeto
//import * as flows from './ssocialflow.js';
////////////////////////////Menu principal de servicio social///////////////////////////////////////
export const menuSocial = addKeyword(['social', 'servicio social'])
  //const MenuPrincipal = addKeyword ('Servicio Social')
  .addAnswer('¿Cómo puedo ayudarte? 😁')
  .addAnswer(
    [
      'Te comparto los siguientes enlaces de interés sobre el proceso:\n',
      '                             *SERVICIO SOCIAL*',
      '_Departamento de Gestión Tecnológica y Vinculación_\n',
      '🤔 *1* Dudas frecuentes de los alumnos',
      '🧾 *2* Consultar documentación',
      '🎬 *3* Video oficial de dudas generales',
      '👉 *4* Fechas importantes (cronograma)',
      '🤖 *5* Galgo Asistente (Ayuda)',
      '👩‍💻 *6* CONTACTO Unidad Tomás Aquino y OTAY'
    ])
    .addAnswer(
      'Por favor, escribe el número de tu opción que deseas consultar:',
      { capture: true},
      async (ctx, {flowDynamic, gotoFlow, fallBack}) => {
        const opcion = ctx.body.trim();
        
        if (opcion === '1') { 
          await flowDynamic('Accediendo a dudas frecuentes...');
          ctx.body = 'ver_dudas';
          return gotoFlow(flowMenuDudas);
        }

        if (opcion === '5') {
          await flowDynamic('Iniciando asistente Galgo...');
          return gotoFlow(gptFlow);
        }
        if (opcion === '4') {
          await flowDynamic(['*FECHAS IMPORTANTES*',
            '✒️Inscripción: del 5 de agosto al 19 de agosto del 2024', //🗝️modificar fecha cada semestre🗝️
            '📌Periodo: Enero - Julio 2025', //🗝️modificar fecha cada semestre🗝️
            ]);
          return gotoFlow(flowCrono);
        }

        const respuestas = {
          '2': [
            '*DOCUMENTACIÓN DEL SERVICIO SOCIAL*',
            'https://www.tijuana.tecnm.mx/servicio-social/', //🗝️modificar url en cambio de documentacion🗝️
            '*Formatos para Proceso de Servicio Social*',
            '📂Manual de apertura de expediente✒️',
            '\n(*FASE 1*)',
            'https://www.tijuana.tecnm.mx/wp-content/uploads/2024/08/MANUAL-1-AGO-DIC-2024-REVISADO.pdf',//🗝️modificar url en cambio de documentacion🗝️
            '\n(*FASE 2*)',
            'https://www.tijuana.tecnm.mx/wp-content/uploads/2024/08/MANUAL-2-AGO2024-REVISADO.pdf',//🗝️modificar url en cambio de documentacion🗝️
            '*Documentación de Curso de Inducción*\nhttps://view.genially.com/663d4ada521f6000143c2380/presentation-guia-de-induccion-servicio-social-del-tecnologico',//🗝️modificar url en cambio de documentacion🗝️
            'Video de Inducción, Preguntas Generales del servicio social \nhttps://youtu.be/OCyEh-ACckA',
          ],
          '3': [
            'Si tienes dudas respecto al servicio social, consulta el video de inducción',
            'Video Inducción del Servicio Social ITT',
            '📽️ https://youtu.be/OCyEh-ACckA',
          ],
          '6': [
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
  
        return fallBack('⚠️ Por favor, selecciona una opción válida (1-6)');
      }
    )
    .addAnswer([
      '*¿Qué deseas hacer?*',
      '',
      '1️⃣ Seguir en menú Servicio Social',
      '2️⃣ Menú Principal',
      '3️⃣ Finalizar conversación'
    ])
    .addAnswer(
      '_Responde con el número de tu elección_',
      { capture: true },
      async (ctx, { gotoFlow, flowDynamic, fallBack }) => {
        try {
          const opcion = ctx.body.trim().toLowerCase();
          
          if (opcion === '1') {
            await flowDynamic('↩️ Volviendo al menú de Servicio Social...');
            return gotoFlow(menuSocial);
          }
          
          if (opcion === '2') {
            await flowDynamic('↩️ Volviendo al menú Principal...');
            return gotoFlow(menuPrincipalFlow);
          }
          if (opcion === '3') {
            return gotoFlow(flowGracias);
          }

          await flowDynamic('⚠️ Opción no válida');
          return gotoFlow(menuSocial);

        } catch (error) {
          console.error('Error en navegación:', error);
          return fallBack('❌ Ocurrió un error, por favor intenta de nuevo');
        }
      }
    );