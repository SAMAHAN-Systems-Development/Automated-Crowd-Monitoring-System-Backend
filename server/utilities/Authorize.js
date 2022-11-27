import path from 'path';
import { google } from 'googleapis';

const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://mail.google.com/",
];

export async function Authorize() {
    var authDetails = {
        scopes: SCOPES
    }

    if (process.env.CREDENTIALS) {
        authDetails["credentials"] = JSON.parse(process.env.CREDENTIALS);
    }
    else {
        authDetails["keyFile"] = CREDENTIALS_PATH;
    }

    const auth = new google.auth.GoogleAuth(authDetails)

    const client = await auth.getClient();

    return client;
}