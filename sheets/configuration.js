const configuration = {
  ID_LENGTH: 10, // THE LENGTH OF NANO ID
  SPREADSHEET_ID: "1faXrVd9NiO8TX-uxm6EalPeJ-1HrtXyjvxgiKaIU3pg", // FOUND IN LINK
  SHEET_NAME: "Registration", // NAME OF THE SHEET
  STARTING_ROW: 2, // THE CELL THAT CONTAINS THE FIRST VALUE ASIDE FROM HEADER
  HEADER_ROW: 0, // THE ROW THAT CONTAINS ALL THE HEADER NAMES

  ID_HEADER_NAME: "GENERATED ID", // THE HEADER NAME OF ID
  ID_COLUMN: "E", // THE COLUMN THAT CONTAINS ALL THE GENERATED ID

  EMAIL_HEADER_NAME: "EMAIL", // THE HEADER NAME OF EMAIL
  EMAIL_COLUMN: "D", // THE COLUMN THAT CONTAINS ALL THE EMAILS

  ENTERED_HEADER_NAME: "ENTERED",
  ENTERED_COLUMN: "F",

  SENT_HEADER_NAME: "EMAIL SENT", 
  SENT_COLUMN: "G",

  LAST_NAME_HEADER_NAME: "LASTNAME",
  LAST_NAME_COLUMN: "B",
  FIRST_NAME_HEADER_NAME: "FIRSTNAME",
  FIRST_NAME_COLUMN: "A",
  MIDDLE_NAME_HEADER_NAME: "MIDDLEINITIAL",
  MIDDLE_NAME_COLUMN: "C",

  START_COLUMN: "A", // FIRST COLUMN WITH DATA
  LAST_COLUMN: "F", // LAST COLUMN WITH DATA
  ROWS: [
    "LASTNAME",
    "FIRSTNAME",
    "MIDDLEINITIAL",
    "EMAIL",
    "GENERATED ID",
    "ENTERED",
  ], // ROW NAMES
};

export default configuration;
