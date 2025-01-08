import { addKeyword } from '@builderbot/bot';

const flowResidencia = addKeyword(['3', 'residencias'])
  .addAnswer('POLIZA: VG-TEC-183-05')
  .addAnswer(
    'Encargada de Residencias Profesionales del Departamento de Gestión Tecnológica y Vinculación',
  )
  .addAnswer('M.A. Karen Zavala Rodríguez')
  .addAnswer('Correo: residencias@tectijuana.edu.mx')
  .addAnswer('Teléfono: (664)6 07 84 23 ext. 124')
  .addAnswer(
    '✉️Carta de presentacion: https://docs.google.com/forms/d/e/1FAIpQLSc1L0G9fsUeM4AAAKAiMKVoIgN34ODKBZ6pIiKMXam-utaELQ/viewform',
  )
  .addAnswer(
    '🏢Banco de proyectos para residencias profecionales: https://docs.google.com/spreadsheets/d/1ltEp3P3uMU77sVTjykXy0LUJ9mSae5um/edit?usp=sharing&ouid=113306876051632131679&rtpof=true&sd=true',
  );

export { flowResidencia };
