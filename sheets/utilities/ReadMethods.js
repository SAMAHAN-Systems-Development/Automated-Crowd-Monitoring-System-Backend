import { google } from "googleapis";
import config from "../configuration.js";
import { Authorize } from "./UtilitiesIndex.js";

export async function GetEmailAndCode(auth) {
  const sheets = google.sheets({ version: "v4", auth });

  try {
    // GET TOTAL NUMBER OF ROWS IN THE SHEET
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: config.SPREADSHEET_ID,
      range: `'${config.SHEET_NAME}'`,
    });

    const sheetsData = res.data.values;

    // SEARCH HEADER FOR ID COLUMN NUMBER
    var idColumnNumber = undefined;
    var emailColumnNumber = undefined;
    for (let index = 0; index < sheetsData[config.HEADER_ROW].length; index++) {
      if (sheetsData[config.HEADER_ROW][index] === config.ID_HEADER_NAME) {
        idColumnNumber = index;
      }
      else if (sheetsData[config.HEADER_ROW][index] === config.EMAIL_HEADER_NAME) {
        emailColumnNumber = index;
      }
    }

    let emailAndCode = [];
    for (let x = 0; x < sheetsData.length; x++) {
      if (x === config.HEADER_ROW) continue;

      emailAndCode.push({
        email: sheetsData[x][emailColumnNumber],
        code: sheetsData[x][idColumnNumber]
      })
    }

    console.log("= = = EMAIL AND CODE SUCCESSFULLY RETRIEVED = = =");

    return emailAndCode;
  } catch (error) {
    console.log(error);
  }
}