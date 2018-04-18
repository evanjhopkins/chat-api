const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

module.exports.init = function() {
    db.defaults({ users: ['evanjhopkins', 'grailed'], threads: {} }).write();
};

module.exports.createUser = function(username) {
    db.read();
    db.get('users').push(username).write();
};

module.exports.doesUserExist = function(username) {
    db.read();
    return db.get('users').value().includes(username);
};

module.exports.writeMessage = function({threadId, usernameFrom, message}) {
    db.read();
    // attempt to get the thread for these users (may not exist yet)
    let thread = db.get('threads').get(threadId);

    // If thread does not exist, create it
    if (!thread.value()) {
        db.get('threads').set(threadId, []).write();
        thread = db.get('threads').get(threadId);
    }

    // construct our message object
    const messageModel = {
        message,
        usernameFrom,
        timestamp: Date.now()
    };

    // add message to thread
    thread.push(messageModel).write()
};

module.exports.getThreadById = function(threadId) {
    db.read();
    return db.get('threads').get(threadId).value();
};
