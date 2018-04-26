'use strict';

var MongoClient = require('mongodb').MongoClient;
var db;

var Contacts = function () {};

Contacts.prototype.connectDb = function(callback) {
    MongoClient.connect(process.env.MONGODB_URL, function(err, database) {
        if(err) {
            callback(err);
        }
        
        db = database.db('aws').collection('contacts');
        
        callback(err, db);
    });
};

Contacts.prototype.allContacts = function(callback) {
    return db.find({}).toArray(callback);
};

Contacts.prototype.add = function(contact, callback) {
    return db.insert(contact, callback);
};

Contacts.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

Contacts.prototype.get = function(name, callback) {
    return db.find({name:name}).toArray(callback);
};

Contacts.prototype.remove = function(name, callback) {
    return db.remove({name:name},{ multi: true}, callback);
};

Contacts.prototype.update = function(name, updatedContact, callback) {
    return db.update({name:name},updatedContact,{}, callback);
};

module.exports = new Contacts();

/*'use strict';

var path = require('path');
var DataStore = require('nedb');
var dbFileName = path.join(__dirname, 'contacts.json');

var db = new DataStore({
    filename : dbFileName,
    autoload : true
});


var Contacts = function () {};

Contacts.prototype.allContacts = function(callback) {
    return db.find({}, callback);
};

Contacts.prototype.add = function(contact, callback) {
    return db.insert(contact, callback);
};

Contacts.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

Contacts.prototype.get = function(name, callback) {
    return db.find({name:name}, callback);
};

Contacts.prototype.remove = function(name, callback) {
    return db.remove({name:name},{ multi: true}, callback);
};

Contacts.prototype.update = function(name, updatedContact, callback) {
    return db.update({name:name},updatedContact,{}, callback);
};

module.exports = new Contacts();*/