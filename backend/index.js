import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors';

var app = express();

app.use(express.json());

dotenv.config();
// Middleware to enable CORS

app.use(cors(
    {
        origin: "*"
    }
));

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

const connection = mysql.createConnection(dbConfig);

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database!');
    // You can perform your database operations here
});

app.get('/', (req, res) => {
    connection.query('CREATE DATABASE IF NOT EXISTS main;');
    connection.query('USE main;');
    connection.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), createDate DATE, age int, PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });

});

app.get('/users', async (req, res) => {
    await connection.query(`SELECT * FROM main.users`, function(err, result, fields) {
        if (err) res.send(err);
        if (result) {
            console.log(result);
            res.status(200).json(result);
        } 
    });
});

app.post('/users', (req, res) => {
    var date = new Date();
    if (req.body.username && req.body.age) {
        console.log('Request received');
        connection.query(`INSERT INTO main.users (username, age, createDate) VALUES ('${req.body.username}', '${req.body.age}', '${date}')`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.status(200).json({ username: req.body.username, age: req.body.age, createDate: date });
        });
    } else {
        console.log('Missing a parameter');
    }
});

var server = app.listen(8000, function() {
    var port = server.address().port;
    var address = server.address().address;

    console.log("Example app listening at http://%s:%s", address, port);
});
