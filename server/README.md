# Automated Crowd Monitoring System REST API

## HOW TO USE

Send REST API requests to

```
https://sysdev-acms-api.onrender.com/{URI}{config}
```

## URIs

<table>
<tr>
<th>
REQUEST
</th>
<th>
ROUTE
</th>
<th>
REQUIRED BODY PROPERTIES
</th>
<th>
DESCRIPTION
</th>
</tr>

<tr>
<td>
GET
</td>
<td>
<code>
/api/users
</code>
</td>
<td>
<pre>
none
</pre>
</td>
<td>
Returns an array of rows as objects
</td>
</tr>

<tr>
<td>
GET
</td>
<td>
<code>
/api/users/:id
</code>
</td>
<td>
<pre>
none
</pre>
</td>
<td>
Returns row as an object if it matches an id from the sheets
</td>
</tr>

<tr>
<td>
PUT
</td>
<td>
<code>
/api/users/:id
</code>
</td>
<td>
<pre>
entered: boolean
</pre>
</td>
<td>
Updates entered status if it matches an id from the sheets
</td>
</tr>

<tr>
<td>
POST
</td>
<td>
<code>
/api/log
</code>
</td>
<td>
<pre>
id: string | number
/*
Add whatever property you want.
Each property is considered as a cell value.
*/
</pre>
</td>
<td>
Adds an entry to log
</td>
</tr>

<tr>
<td>
POST
</td>
<td>
<code>
/api/send-email
</code>
</td>
<td>
<pre>
none
</pre>
</td>
<td>
Sends email of qr code to users
</td>
</tr>
</table>

## REQUIRED CONFIGS
Pass the follwing as a URL query every time you send a request to the API.
```javascript
{
  ID_LENGTH: 10, // THE LENGTH OF NANO ID
  SPREADSHEET_ID: "1faXrVd9NiO8TX-uxm6EalPeJ-1HrtXyjvxgiKaIU3pg", // FOUND IN LINK
  SHEET_NAME: "Registration", // NAME OF THE SHEET
  STARTING_ROW: 2, // THE CELL THAT CONTAINS THE FIRST VALUE ASIDE FROM HEADER
  HEADER_ROW: 0, // THE ROW THAT CONTAINS ALL THE HEADER NAMES

  // SHEET STRUCTURE
  ID_HEADER_NAME: "GENERATED ID",
  ID_COLUMN: "E",

  EMAIL_HEADER_NAME: "EMAIL", 
  EMAIL_COLUMN: "D",

  ENTERED_HEADER_NAME: "ENTERED",
  ENTERED_COLUMN: "F",

  SENT_HEADER_NAME: "EMAIL SENT", 
  SENT_COLUMN: "G",

  // FOR LOG
  LOG_SHEET_NAME: "Log"
}
```