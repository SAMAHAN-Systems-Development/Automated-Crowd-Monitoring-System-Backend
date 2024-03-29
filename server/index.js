import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import {
  Authorize,
  GetUsers,
  GetUser,
  UpdateEnteredStatus,
  AddToLog,
  GenerateIDs,
} from "./utilities/UtilitiesIndex.js";
import { SendEmail } from "./EmailSender/EmailSender.js";

const app = express();
app.set("port", process.env.PORT || 8080);

// CORS
app.use(cors());

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO: UPDATE WELCOME PAGE
app.get("/", async (req, res) => {
  try {
    res.status(200).json({ msg: "Hello, World!" });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

app.get("/api/generate-ids", async (req, res) => {
  const config = req.query;

  try {
    const auth = await Authorize();
    const generate = await GenerateIDs(auth, config);

    res.status(200).json({msg: generate});
  }
  catch (error) {
    res.status(400).json({ msg: error });
  }
})

app.get("/api/users", async (req, res) => {
  const config = req.query;

  try {
    const auth = await Authorize();
    const users = await GetUsers(auth, config);

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// Returns row as an object if it matches an id from the sheets
app.get("/api/users/:id", async (req, res) => {
  const config = req.query;

  try {
    const auth = await Authorize();
    const result = await GetUser(auth, config, req.params.id);

    // IF USER IS NOT FOUND
    if (result === null) {
      throw "UserNotFound";
    }

    res.status(200).json(result);
  } catch (error) {
    if (error === "UserNotFound") {
      res.status(404).json({ msg: error });
      return;
    }

    res.status(400).json({ msg: error });
  }
});

// Updates entered status if it matches an id from the sheets
app.put("/api/users/:id", async (req, res) => {
  const { entered } = req.body;
  const config = req.query;
  try {
    const auth = await Authorize();

    const result = await UpdateEnteredStatus(
      auth,
      config,
      req.params.id,
      entered
    );

    // IF USER IS NOT FOUND
    if (result === null) {
      throw "UserNotFound";
    }

    res.status(200).json({
      msg: "Success!",
      result: result,
    });
  } catch (error) {
    if (error === "UserNotFound") {
      res.status(404).json({ msg: error });
      return;
    }

    res.status(400).json({ msg: error });
  }
});

// ADDS AN ENTRY TO LOG
app.post("/api/log", async (req, res) => {
  const config = req.query;
  try {
    const auth = await Authorize();
    const logData = await AddToLog(auth, config, req.body);

    res.status(201).json(logData);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

// Sends email of qr code to users
app.post(`/api/send-email`, async (req, res) => {
  const config = req.query;

  try {
    const auth = await Authorize();
    const result = await GetUsers(auth, config);

    // IF USER IS NOT FOUND
    if (result === null) {
      throw "UsersNotFound";
    }

    // SEND EMAILS
    var sendEmailStatus = await SendEmail(config, result);

    if (sendEmailStatus !== 200) {
      throw "EmailError";
    }

    res.status(200).json(result);
  } catch (error) {
    if (error === "UsersNotFound") {
      res.status(404).json({ msg: error });
      return;
    } else if (error === "EmailError") {
      res.status(400).json({ msg: error });
    }

    res.status(400).json({ msg: error });
  }
});

app.listen(app.get("port"), () => {
  console.log("SERVER ON PORT", app.get("port"));
});
