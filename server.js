const express = require('express');
const app = express();
const { MongoClient } = require('mongodb')
const api = require('./routes/api.js');

app.use(express.static('public'));
app.use(express.json());



async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


let users = null;
function setUsers(req, res, next) {
    req.users = users;
    next();
}

async function startServer() {
    // const client = new MongoClient(`mongodb://localhost:27017`);

    try {
        // await client.connect();
        // await listDatabases(client);

        // Conectando no banco que contem os usuários
        // users = client.db("dbtarefa11").collection("users");
        // let allUsers = await users.find().toArray();
        // console.log(allUsers);

        app.use(setUsers);
        app.use(api);

        app.listen(3000);
        console.log("Servidor escutando porta 3000");
    } catch (e) {
        console.error(e);
    }
}
startServer();