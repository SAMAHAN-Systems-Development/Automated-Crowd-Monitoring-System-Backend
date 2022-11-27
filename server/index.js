import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// UTILITIES
import {
    Authorize
} from './utilities/UtilitiesIndex.js';

const app = express();
app.set('port', process.env.PORT || 8080);

// CORS
app.use(cors());

// BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/authorize', async (req, res) => {
    try {
        await Authorize()
        res.status(200).json({"msg": "Success!"});
    }
    catch (error) {
        res.status(400).json({"msg": error})
    }
});

app.listen(app.get('port'), () => {
    console.log("SERVER ON PORT", app.get('port'));
});