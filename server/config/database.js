var mongo = {
    primary: 'mongodb://localhost/imentor'
}
module.exports = {
    getDBURL: function (key) {
        return mongo[key];
    }
}