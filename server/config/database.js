var mongo = {
    primary: 'mongodb://localhost/yosammy'
}
module.exports = {
    getDBURL: function (key) {
        return mongo[key];
    }
}