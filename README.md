# **SysDev Automated Crowd Monitoring System**

## REQUIREMENTS
* NodeJS
* `credentials.json` file
---
### INSTRUCTIONS FOR `/sheets`
1. Change directory to `/sheets`
   ```bash
    cd sheets
    ```
2. Install dependencies.
    ```bash
    npm install
    ```
3. Run code.
    ```bash
    node .
    ```
4. Input choice on ```console```.
5. Authorize Google account.

    Authorization will only be run once. If you wish to re-authorize, delete `token.js` file.

### INSTRUCTIONS FOR `/server`
1. Change directory to `/server`
   ```bash
    cd server
    ```
2.  Add `credentials.json` file.
3. Install dependencies.
    ```bash
    npm install
    ```
4. Run code.
    ```bash
    npm run dev
    ```
5. Make requests to `localhost:8080` or `localhost:{PORT}` (if you have a development port).

    <a href="https://github.com/SAMAHAN-Systems-Development/Automated-Crowd-Monitoring-System-Backend/tree/main/server">View documentation for the REST API here.</a>