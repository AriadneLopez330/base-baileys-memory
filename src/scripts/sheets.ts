import {google, sheets_v4} from 'googleapis';
import {GaxiosResponse} from 'gaxios';
import dotenv from 'dotenv';
dotenv.config();

//inicializar la libreria cliente de google y configurar las gredenciales de la cuenta de servicio
const auth = new google.auth.GoogleAuth(
    {
        keyFile:'./google_sublime.json', //ruta en la carpeta del archivo clave de cuenta de servicio
        scopes: 'https.//www.googleapis.com/auth/spreadsheets' //permite el acceso de lectura y escritura a las hojas de cálculo.
        // es el alcance para las apis de Google Sheets
    }
);
const spreadsheetId = process.env.SPREADSHEETID

//funcion asincrona para escribir datos en una hoja de calculo
async function writeToSheets(values: any[] [], range: string): Promise<GaxiosResponse<sheets_v4.Schema$UpdateValuesResponse> | void > {
    const sheets = google.sheets({version: 'v4', auth}); //crea una instancia cliente de la API de sheets
    const valueInputOption = 'USER_ENTERED'; //EL como se deben de interpretar los datos de entrada

    const resource = {
        values 
    }; // los datos que se escribiran

    try {
        const res = await sheets.spreadsheets.values.update({
            spreadsheetId, 
            range, 
            valueInputOption,
            requestBody: resource
            }
        );
        return res; //devolver la respuesta de la API de sheets
    } catch (error) {
        console.error('Error', error); //registra correos
    }
}

//funcion asincrona para leer datos de una hoja de calculo de google
async function readSheet(): Promise<any [][] | void> {
    const sheets = google.sheets ({version: 'v4', auth});
    const range = 'Sheet1!A1:J35' //seccion del rango

    try {
        const response = await sheets.spreadsheets.values.get ({
            spreadsheetId,
            range
        });
        const rows= response.data.values; //extrae las ilas de la respuesta 
        return rows || []; //devuelve las filas o un array vacio <-------
    } catch (error) {
        console.error('Error', error ); //registrar errores
        return;
    }
}
export {writeToSheets, readSheet };