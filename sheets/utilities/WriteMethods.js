import { google } from "googleapis";
import config from "../configuration.js";

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

export async function SetToEmailSent(auth, user) {
  if (user.code.length > 0) {
    const sheets = google.sheets({ version: "v4", auth });
    let row = await GetRowFromCode(auth, user.code);
    try {
      const updateOptions = {
        spreadsheetId: config.SPREADSHEET_ID,
        range: `'${config.SHEET_NAME}'!${config.SENT_COLUMN}${row}`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [["TRUE"]],
        },
      };

      // let res = await sheets.spreadsheets.values.update(updateOptions);
      // console.log(res);
      await sheets.spreadsheets.values.update(updateOptions);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return false;
}
