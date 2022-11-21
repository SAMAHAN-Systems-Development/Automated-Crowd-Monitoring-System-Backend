import { google } from "googleapis";
import config from "../configuration.js";

// NANO ID
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdef', config.ID_LENGTH);

// THIS FUNCTION GENERATES THE ID FOR ALL THE ROWS INSIDE THE SHEET
export default async function GenerateIDs(auth) {
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
    for (let index = 0; index < sheetsData[config.HEADER_ROW].length; index++) {
      if (sheetsData[config.HEADER_ROW][index] === config.ID_HEADER_NAME) {
        idColumnNumber = index;
        break;
      }
    }

    // WRITING ID
    const idArray = [];
    for (let rowIndex = 0; rowIndex < sheetsData.length; rowIndex++) {
      if (rowIndex < config.STARTING_ROW - 1) continue;

      // IF THERE IS EXISTING ID, SKIP
      if (sheetsData[rowIndex][idColumnNumber]?.length === config.ID_LENGTH) {
        idArray.push([sheetsData[rowIndex][idColumnNumber]]);
      } else idArray.push([nanoid()]);
    }

    const request = {
      spreadsheetId: config.SPREADSHEET_ID,
      range: `'${config.SHEET_NAME}'!${config.ID_COLUMN}${config.STARTING_ROW}:${config.ID_COLUMN}`, // RANGE IS ONLY FOR THE ID COLUMN
      valueInputOption: "RAW",
      resource: { values: idArray },
    };

    //  SEND REQUEST TO WRITE
    await sheets.spreadsheets.values.update(request).data;

    console.log("= = = IDs SUCCESSFULLY GENERATED = = =");
  } catch (error) {
    console.log(error);
  }
}
