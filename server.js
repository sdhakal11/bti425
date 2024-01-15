/*
id- sdhakal11
pass- VXGkSImq5T4H8NQA
*/

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'API Listening'});
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
