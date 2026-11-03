const database = {}

database.users = require('./models/user.model');

function intializeUsers(){
    const NAMES = ["perico","jorge","segismundo","dolores"];
    NAMES.forEach((username) => {
        database.users.register(username, "1234");
    });
}

function initializeDB(){
    intializeUsers();
    console.log("Base de datos inicializada")
}

initializeDB();
module.exports = database;
