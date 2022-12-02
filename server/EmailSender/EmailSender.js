import nodemailer from "nodemailer";
import config from "./config.js";

import * as dotenv from "dotenv";
import { Authorize, GetUsers } from "../utilities/UtilitiesIndex.js";
import path from "path";

export async function SendEmail(sheetConfiguration, users) {
  dotenv.config({ path: path.join(process.cwd(), "EmailSender/.env") });

  try {
    let transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        type: "OAuth2",
        user: config.user,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });

    if (users !== undefined) {
      for (let user of users) {
        if (user[sheetConfiguration.SENT_HEADER_NAME] == "FALSE") {
          // if (SetToEmailSent(auth, user)) {                                  no working SetToEmailSent function yet kay gibago
          let mailOptions = {
            from: `"${config.name}" <${config.user}>`,
            to: user.EMAIL,
            subject: config.subject,
            html: getHTML(user),
          };
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log(`Sent to ${user.EMAIL}`);
            }
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function getHTML(user) {
  return `
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin: 0; background-color: #cccccc">
    <div
      class="wrapper"
      style="
        width: 100%;
        table-layout: fixed;
        background-color: #cccccc;
        padding-bottom: 3rem;
      "
    >
      <table
        class="main"
        style="
          border-spacing: 0;
          width: 100%;
          background-color: white;
          margin: 0 auto;
          max-width: 600px;
          font-family: sans-serif;
          color: #141414;
          font-size: 0.85rem;
        "
        width="100%"
        bgcolor="white"
      >
        <tr>
          <td
            class="border-top"
            style="padding: 0; background-color: #141414; height: 1rem"
            bgcolor="#141414"
          ></td>
        </tr>
        <tr>
          <td
            class="header"
            style="
              padding: 0;
              background-color: #080461;
              height: fit-content;
              width: 100%;
            "
            width="100%"
            bgcolor="#080461"
          >
            <img
              class="img"
              src="https://i.ibb.co/zJ31xJw/header.png"
              alt="header"
              style="
                border: 0;
                width: 100%;
                height: 100%;
                -o-object-fit: contain;
                object-fit: contain;
              "
            />
          </td>
        </tr>
        <tr>
          <td class="text" style="padding: 3rem 1rem">
            <table style="border-spacing: 0">
              <tr>
                <td
                  class="letter-heading"
                  style="padding: 0; padding-bottom: 1rem"
                >
                  <span class="name" style="font-weight: 800"
                    >${user.FIRSTNAME}</span
                  >,
                </td>
              </tr>
              <tr>
                <td class="letter-body" style="padding: 0">
                  In mollit velit exercitation commodo veniam. Laborum ex
                  laboris consequat consectetur velit anim nulla occaecat ut
                  occaecat dolore aute excepteur in. Dolore consequat aliqua ut
                  adipisicing excepteur adipisicing adipisicing sint. Incididunt
                  eiusmod qui cupidatat aliquip nulla pariatur nostrud deserunt
                  deserunt ea. Deserunt enim occaecat laboris sint dolore
                  reprehenderit magna duis sit ut culpa do ut qui.
                </td>
              </tr>
              <tr style="padding: 0.2rem 0;">
                <tr>
                  <td
                    class="qr"
                    style="text-align: center"
                    align="center"
                  >
                    <img id="qr"
                    src=https://chart.googleapis.com/chart?cht=qr&chl=${user["GENERATED ID"]}&chs=160x160&chld=L|0" style="border: 0;">
                  </td>
                </tr>
                <tr>
                  <td
                    style="text-align: center"
                    align="center"
                  >
                    ${user["GENERATED ID"]}
                  </td>
                </tr>
              </tr>
              <tr>
                <td style="padding: 0">
                  <table
                    class="letter-signature"
                    style="border-spacing: 0; padding-top: 2rem"
                  >
                    <tr>
                      <td style="padding: 0">See you on campus!</td>
                    </tr>
                    <tr>
                      <td class="name" style="padding: 0; font-weight: 800">
                        SAMAHAN Department of Systems Development
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td
            class="footer"
            style="padding: 0; background-color: #27256a; height: fit-content"
            bgcolor="#27256a"
          >
            <img
              class="img"
              src="https://i.ibb.co/M1wCSZr/footer.png"
              alt="footer"
              style="
                border: 0;
                width: 100%;
                height: 100%;
                -o-object-fit: contain;
                object-fit: contain;
              "
            />
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>

  `;
}

