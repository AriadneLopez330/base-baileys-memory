import { addKeyword } from '@builderbot/bot';
import { menuPrincipalFlow } from '../menuPrincipalFlow.js';


  ////////////////////////
  export const flowMenuDudas = addKeyword(['social', 'servicio social'])
  //const MenuPrincipal = addKeyword ('Servicio Social')
  .addAnswer('¿Como puedo ayudarte?😁')
  .addAnswer(
    [
    '1️⃣  ¿Dónde puedo realizar mi registro?',
    '2️⃣  ¿Cuándo inicia el servicio social?',
    '3️⃣  ¿Cuánto tiempo dura el servicio social?',
    '4️⃣  ¿No aparece el Servicio Social en Ambar?',
    '5️⃣  ¿Hasta cuándo tengo para subir documentos?',
    '6️⃣  ¿Dónde puedo realizar mi servicio Social?',
    '7️⃣  ¿Necesito mi constancia de liberación?',
    '8️⃣  ¿Me llegó un correo para darme de baja?',
    '9️⃣  ¿Problemas con documentos iniciales?',
    '🔟  ¿Seguro facultativo?',
  
    ], 
    
  )
    .addAnswer(
      '_Galgo Asistente_',
      { capture: true },
      async (ctx, {fallBack, flowDynamic}) => {
        const opcion = ctx.body.trim();
      
        const respuestas = {
          '1': [
            '*REGISTRO DE SERVICIO SOCIAL*',
            '• Es necesario realizar el curso de inducción',
            '• Ingresa al sitio Oficial de Servicio Social',
            '• 👉https://sitec.tijuana.tecnm.mx/servicio_social/index.php👈',
            '• *Ingresa tu matrícula* y pulsa _Curso de inducción_',
          ],
          '2': [
            '*INICIO DEL SERVICIO SOCIAL*',
            '*El periodo actual es:*',
            '• AGOSTO 24 - FEBRERO 25', //🗝️ACTUALIZAR CADA SEMESTRE
            '\n*La fecha de inscripción*',
            '• 5 de agosto al 19 de agosto del 2024', //🗝️ACTUALIZAR CADA SEMESTRE
          ],
          '3': [
            '*DURACIÓN DEL SERVICIO SOCIAL*',
            '• *6 MESES Y 1 DÍA*',
            '• Cumpliendo como objetivo con 480 Horas',
            '-------------------------------------------------',
            'Para calcular la fecha FINAL de tu servicio social',
            'Es 6 meses y 1 día después de la fecha Inicial',
            '*Ejemplo*',
            '*Fecha inicial:* _Lunes 05 de Agosto 2024_',
            '*Terminación:* _Jueves 06 de Febrero 2025_', //🗝️ACTUALIZAR CADA SEMESTRE
          ],
          '4': [
            '*PROBLEMA CON AMBAR*',
            '• Debes acudir con tu coordinador para que lo cargue a Ambar como materia',
            '• También puedes realizar una "constancia de estudios con horario escolar" en línea',
            '• Donde aparezca _Servicio Social_ en curso',
            '\n_Caso especial y casos comité_',
            '• Es importante guardar el comprobante de pago del semestre en curso',
            '• Anexarlo en un mismo documento al subir tu kardex a la plataforma',
          ],
            '5': [
            '*FECHAS LÍMITE DOCUMENTOS*',
            'CARGA DE DOCUMENTOS',
            '🔸_FASE 1_',
            '• 23 al 30 de Agosto de 2024', //🗝️ACTUALIZAR CADA SEMESTRE
            '🔸_REVISIÓN FASE 1_',
            '• 24 de Agosto del 2024', //🗝️ACTUALIZAR CADA SEMESTRE
          ],
          '6': [
            '*LUGARES PARA SERVICIO SOCIAL*',
            '*BANCO DE DEPENDENCIAS*',
            '• Ingresa al Banco de Dependencias',
            '• Puedes seleccionar dependencias Internas y Externas',
            '• https://goo.su/czvxuq', //🗝️ACTUALIZAR CADA SEMESTRE
          ],
          '7': [
            '*CONSTANCIA DE LIBERACIÓN*',
            '• La puedes CONSULTAR en Ambar y DESCARGAR el archivo PDF',
            '_Es indispensable guardar este documento, es requisito para tu titulación_',
            '\n🥲*Ya lo consulté en ambar*',
            '_Pero no me aparece ningún PDF_',
            '\nPreséntate al Departamento de Gestión Tecnológica y Vinculación con los siguientes datos:',
            '• *Nombre*',
            '• *Número de control*',
            '• *Carrera*',
            '• *Asunto*',
            '• *Unidad (Tomas aquino u Otay)*',
          ],
          '8' : [
            '*CORREO DE BAJA*',
            'Debes de mandar un correo a serviciosocial@tectijuana.edu.mx con:',
            '• *Nombre*',
            '• *Número de control*',
            '• *Carrera*',
            '• *Asunto:* _Darme de Baja_',
            '• Carta de motivos firmada para baja del período pasado',
            '• Continuar en este período (AGO 24 -FEB 25)', //🗝️ACTUALIZAR CADA SEMESTRE
            '• *Unidad Perteneciente* (Tomas Aquino u Otay)',
          ],
          '9': [
            '*PROBLEMAS CON DOCUMENTOS*',
            '• Debes notificar vía correo electrónico que subiste los documentos iniciales',
            '• Es fundamental seguir la misma cadena de correo electrónico',
            '• Esperar de 1 a 3 días hábiles para recibir respuesta',
            '• Si ya pasó más tiempo, puedes reenviar el correo',
            '• Es fundamental darle seguimiento a tu expediente vía correo electrónico',
          ],
          '10': [
            '*SEGURO FACULTATIVO*',
            '• Si ya cuentas con seguro social (padres/trabajo), es válido',
            '• Solo sube constancia de vigencia',
            '• Para solicitar constancia del seguro social:',
            '• 👉https://goo.su/bS44Mj👈',
            '\nEn caso de vigencia: BAJA',
            '• Solicitar en servicios escolares',
            '• Dada de ALTA en IMSS por la institución',
            '• Llenar Formulario (respuesta en 24h a 72h)',
          ]
        };
        if (respuestas[opcion]) {
          return flowDynamic(respuestas[opcion]);
        }
  
        return fallBack('⚠️ Por favor, selecciona una opción válida (1-10)');
      }
    )
    .addAnswer(
      [
        '⭕ Por favor, escribe el número de tu opción que deseas consultar:',
        '🟢 Escribe un número (1-10)', 
        '🔴 "menu" para volver al menú dudas frecuentes',
        '🟡 "salir" para volver al menú principal'
      ],
      { capture: true },
      async (ctx, { gotoFlow }) => {
        if (ctx.body.toLowerCase() === 'menu') {
          return gotoFlow(flowMenuDudas);
        }
        else if (ctx.body.toLowerCase() === 'salir') {
            return gotoFlow(menuPrincipalFlow);
        }
      }
    );
