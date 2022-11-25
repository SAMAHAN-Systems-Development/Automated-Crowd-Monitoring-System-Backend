import { google } from "googleapis";
import config from "../configuration.js";
// import { Authorize } from "./UtilitiesIndex.js";

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
    var sentColumnNumber = undefined;
    var firstNameColumnNumber = undefined;
    var lastNameColumnNumber = undefined;
    var middleInitialColumnNumber = undefined;

    for (let index = 0; index < sheetsData[config.HEADER_ROW].length; index++) {
      if (sheetsData[config.HEADER_ROW][index] === config.ID_HEADER_NAME) {
        idColumnNumber = index;
      } else if (
        sheetsData[config.HEADER_ROW][index] === config.EMAIL_HEADER_NAME
      ) {
        emailColumnNumber = index;
      } else if (sheetsData[config.HEADER_ROW][index] === config.SENT_HEADER_NAME) {
        sentColumnNumber = index;
      } else if (sheetsData[config.HEADER_ROW][index] === config.FIRST_NAME_HEADER_NAME) {
        firstNameColumnNumber = index;
      } else if (sheetsData[config.HEADER_ROW][index] === config.LAST_NAME_HEADER_NAME) {
        lastNameColumnNumber = index;
      } else if (sheetsData[config.HEADER_ROW][index] === config.MIDDLE_NAME_HEADER_NAME) {
        middleInitialColumnNumber = index;
      }
    }

    let emailAndCode = [];
    for (let x = 0; x < sheetsData.length; x++) {
      if (x === config.HEADER_ROW) continue;

      let row = {
        email: sheetsData[x][emailColumnNumber],
        code: sheetsData[x][idColumnNumber],
        sent: sheetsData[x][sentColumnNumber]
      }
      
      // IF FIRST NAME EXISTS
      if (firstNameColumnNumber !== undefined) {
        row["firstName"] = sheetsData[x][firstNameColumnNumber];
      }

      // IF LAST NAME EXISTS
      if (lastNameColumnNumber !== undefined) {
        row["lastName"] = sheetsData[x][lastNameColumnNumber];
      }

      // IF MIDDLE NAME EXISTS
      if (middleInitialColumnNumber !== undefined) {
        row["middleInitial"] = sheetsData[x][middleInitialColumnNumber];
      }

      emailAndCode.push({...row});
    }

    console.log("= = = EMAIL AND CODE SUCCESSFULLY RETRIEVED = = =");

    return emailAndCode;
  } catch (error) {
    console.log(error);
  }
}

async function GetRowFromCode(auth, code) {
  const sheets = google.sheets({ version: "v4", auth });

  try {
    // GET COLUMN WITH IDS
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: config.SPREADSHEET_ID,
      range: `'${config.SHEET_NAME}'!${config.ID_COLUMN}:${config.ID_COLUMN}`, // 'Registration'!E:E
    });

    const ids = res.data.values;

    for (let i = 0; i < ids.length; i++) {
      if (ids[i][0] === code) {
        return i + 1;
      }
    }

    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function MarkPresent(auth, code) {
  if (code.length !== config.ID_LENGTH) {
    console.log("Code should have " + config.ID_LENGTH + " chars.");
    return null;
  }

  const row = await GetRowFromCode(auth, code);

  if (row === null) {
    console.log("Code not found. Code: " + code);
    return null;
  }

  const sheets = google.sheets({ version: "v4", auth });

  try {
    // GET PARTICIPANT DATA
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: config.SPREADSHEET_ID,
      range: `'${config.SHEET_NAME}'!${config.START_COLUMN}${row}:${config.LAST_COLUMN}${row}`, // 'Registration'!A1:F1
    });

    const data = res.data.values[0];

    let participant = {};

    for (let i = 0; i < data.length; i++) {
      let field = config.ROWS[i];
      let info = data[i];

      participant[field] = info;

      // Check if participant already entered or just entered now
      if (field === config.ENTERED_HEADER_NAME) {
        // if info is true already, then its not first time
        participant["FIRST ENTER"] = info === "TRUE" ? "FALSE" : "TRUE";
      }
    }

    // UPDATE ENTERED FIELD
    const res2 = await sheets.spreadsheets.values.update({
      spreadsheetId: config.SPREADSHEET_ID,
      range: `'${config.SHEET_NAME}'!${config.ENTERED_COLUMN}${row}:${config.ENTERED_COLUMN}${row}`,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [["TRUE"]],
      },
    });

    return participant;
  } catch (error) {
    console.log(error);
  }
}