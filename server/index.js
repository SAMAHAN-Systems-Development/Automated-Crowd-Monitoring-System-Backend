import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import {
    Authorize
} from './utilities/Authorize.js';

const app = express();
app.set('port', process.env.PORT || 8080);

// CORS
app.use(cors());

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', async (req, res) => {
    try {
        // res.send("Hello, world!")
        res.status(200).json({"msg": "Hello, World!"});
    }
    catch (error) {
        res.status(400).json({"msg": error})
    }
});

app.get('/authorize', async (req, res) => {
    try {
        const auth = await Authorize();
        res.status(200).json({"msg": "Success!", "client": auth});
    }
    catch (error) {
        console.log(error)
        res.status(400).json({"msg": error})
    }
});

app.listen(app.get('port'), () => {
    console.log("SERVER ON PORT", app.get('port'));
});