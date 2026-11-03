const users = {}

users.data = {}

users.register = function(username, password){
    //TODO comprobar si existe el usuario
    //TODO cifrar contraseña
    users.data[username] = {username, password};
}

users.isLoginRight = function(username, password){
    if (!users.data[username]){
        return false;
    }
    return users.data[username].password == password;
}

module.exports = users;