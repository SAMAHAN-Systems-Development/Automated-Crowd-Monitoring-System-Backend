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

export async function UpdateEnteredStatus(auth, id, entered) {
  const sheets = google.sheets({ version: "v4", auth });

  try {
    // GET TOTAL NUMBER OF ROWS IN THE SHEET
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: config.SPREADSHEET_ID,
      range: `'${config.SHEET_NAME}'`,
    });

    const sheetsData = res.data.values;

    const ID_COLUMN_NUMBER = findHeaderColumnNumber(
      sheetsData,
      config.ID_HEADER_NAME
    );

    for (let x = 0; x < sheetsData.length; x++) {
      if (x === config.HEADER_ROW) continue;

      // IF CODE OF USER MATCHES, MARK AS PRESENT
      if (sheetsData[x][ID_COLUMN_NUMBER] === id) {
        const writeOptions = {
          spreadsheetId: config.SPREADSHEET_ID,
          range: `'${config.SHEET_NAME}'!${config.ENTERED_COLUMN}${x + 1}:${
            config.ENTERED_COLUMN
          }${x + 1}`,
          resource: { values: [[entered]] },
          valueInputOption: "USER_ENTERED",
        };

        const result = await sheets.spreadsheets.values.update(writeOptions);

        return result.data;
      }
    }

    // IF USER NOT FOUND
    return null;
  } catch (error) {
    return error;
  }
}

export async function AddToLog(auth, data) {
  const sheets = google.sheets({ version: "v4", auth });
  try {
    let entries = [new Date()];

    let headers = [];
    for (let header in data) {
      headers.push(header);
    }

    for (let x = 0; x < headers.length; x++) {
      entries.push(data[headers[x]]);
    }

    console.log(entries);
    sheets.spreadsheets.values.append({
      spreadsheetId: config.SPREADSHEET_ID,
      range: `'${config.LOG_SHEET_NAME}'`,
      resource: { values: [[...entries]] },
      valueInputOption: "USER_ENTERED",
    });

    return true;
  } catch (error) {
    return error;
  }
}

export async function SetToEmailSent(auth, user) {
  //new function | to fix
  const sheets = google.sheets({ version: "v4", auth });
  console.log(user);

  // try {
  //   // GET TOTAL NUMBER OF ROWS IN THE SHEET
  //   const res = await sheets.spreadsheets.values.get({
  //     spreadsheetId: config.SPREADSHEET_ID,
  //     range: `'${config.SHEET_NAME}'`,
  //   });

  //   const sheetsData = res.data.values;

  //   const ID_COLUMN_NUMBER = findHeaderColumnNumber(
  //     sheetsData,
  //     config.ID_HEADER_NAME
  //   );

  //   for (let x = 0; x < sheetsData.length; x++) {
  //     if (x === config.HEADER_ROW) continue;

  //     // IF CODE OF USER MATCHES, MARK AS PRESENT
  //     if (sheetsData[x][ID_COLUMN_NUMBER] === id) {
  //       const writeOptions = {
  //         spreadsheetId: config.SPREADSHEET_ID,
  //         range: `'${config.SHEET_NAME}'!${config.ENTERED_COLUMN}${x + 1}:${
  //           config.ENTERED_COLUMN
  //         }${x + 1}`,
  //         resource: { values: [[entered]] },
  //         valueInputOption: "USER_ENTERED",
  //       };

  //       const result = await sheets.spreadsheets.values.update(writeOptions);

  //       return result.data;
  //     }
  //   }

  //   // IF USER NOT FOUND
  //   return null;
  // } catch (error) {
  //   return error;
  // }
}

// export async function SetToEmailSent(auth, user) {                         old function
//   if (user[config.ID_HEADER_NAME].length > 0) {
//     const sheets = google.sheets({ version: "v4", auth });
//     let row = await GetRowFromCode(auth, user.code);
//     try {
//       const updateOptions = {
//         spreadsheetId: config.SPREADSHEET_ID,
//         range: `'${config.SHEET_NAME}'!${config.SENT_COLUMN}${row}`,
//         valueInputOption: "USER_ENTERED",
//         resource: {
//           values: [["TRUE"]],
//         },
//       };

//       // let res = await sheets.spreadsheets.values.update(updateOptions);
//       // console.log(res);
//       await sheets.spreadsheets.values.update(updateOptions);
//       return true;
//     } catch (error) {
//       console.log(error);
//       return false;
//     }
//   }
//   return false;
// }
