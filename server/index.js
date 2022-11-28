import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {
    Authorize,
    GetUsers,
    GetUser,
    UpdateEnteredStatus
} from './utilities/UtilitiesIndex.js';

const app = express();
app.set('port', process.env.PORT || 8080);

// CORS
app.use(cors());

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO: UPDATE WELCOME PAGE
app.get('/', async (req, res) => {
    try {
        // res.send("Hello, world!")
        res.status(200).json({"msg": "Hello, World!"});
    }
    catch (error) {
        res.status(400).json({"msg": error})
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const auth = await Authorize();
        const users = await GetUsers(auth);

        res.status(200).json(users)
    }
    catch (error) {
        res.status(400).json({"msg": error})
    }
})

// Returns row as an object if it matches an id from the sheets
app.get('/api/users/:id', async (req, res) => {
    try {
        const auth = await Authorize();
        const result = await GetUser(auth, req.params.id);

        // IF USER IS NOT FOUND
        if (result === null) {
            throw "UserNotFound";
        }

        res.status(200).json(result);
    }
    catch (error) {
        if (error === "UserNotFound") {
            res.status(404).json({msg: error});
            return;
        }

        res.status(400).json({"msg": error})
    }
});

// Updates entered status if it matches an id from the sheets
app.put('/api/users/:id', async (req, res) => {
    const { entered } = req.body;
    try {
        const auth = await Authorize();

        const result = await UpdateEnteredStatus(auth, req.params.id, entered);

        // IF USER IS NOT FOUND
        if (result === null) {
            throw "UserNotFound";
        }

        res.status(200).json({
            "msg": "Success!",
            "result": result
        })
    }
    catch (error) {
        if (error === "UserNotFound") {
            res.status(404).json({msg: error});
            return;
        }

        res.status(400).json({"msg": error})
    }
})

app.listen(app.get('port'), () => {
    console.log("SERVER ON PORT", app.get('port'));
});