import { google } from "googleapis";
import config from "../configuration.js";

function findHeaderColumnNumber(sheetsData, headerName) {
  for (let index = 0; index < sheetsData[config.HEADER_ROW].length; index++) {
    if (sheetsData[config.HEADER_ROW][index] === headerName) {
      return index;
    }
  }
  return undefined;
}

export async function GetUsers(auth) {
  const sheets = google.sheets({ version: "v4", auth });

  try {
    // GET TOTAL NUMBER OF ROWS IN THE SHEET
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: config.SPREADSHEET_ID,
      range: `'${config.SHEET_NAME}'`,
    });

    const sheetsData = res.data.values;

    var headers = [];
    var users = [];

    for (let header of sheetsData[config.HEADER_ROW]) {
      headers.push(header);
    }

    for (let x = 0; x < sheetsData.length; x++) {
      if (x === config.HEADER_ROW) continue;

      let user = {};

      for (let y = 0; y < sheetsData[config.HEADER_ROW].length; y++) {
        user[headers[y]] = sheetsData[x][y];
      }
      
      users.push(user);
    }

    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function GetUser(auth, id) {
  const sheets = google.sheets({ version: "v4", auth });

  try {
    // GET TOTAL NUMBER OF ROWS IN THE SHEET
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: config.SPREADSHEET_ID,
      range: `'${config.SHEET_NAME}'`,
    });

    const sheetsData = res.data.values;
  
    const ID_COLUMN_NUMBER = findHeaderColumnNumber(sheetsData, config.ID_HEADER_NAME);

    for (let x = 0; x < sheetsData.length; x++) {
      if (x === config.HEADER_ROW) continue;

      // IF CODE OF USER MATCHES, RETURN ROW
      if (sheetsData[x][ID_COLUMN_NUMBER] === id) {
        let result = {};
        for (let y = 0; y < sheetsData[config.HEADER_ROW].length; y++) {
          result[sheetsData[config.HEADER_ROW][y]] = sheetsData[x][y];
        }
        return result;
      }
    }

    // IF USER NOT FOUND
    return null;
  }
  catch (error) {
    return error;
  }
}