const md5 = require('md5');

function getThreadId(usernameFrom, usernameTo) {
    // put the usersnames into a list
    const list = [usernameFrom, usernameTo];
    // order the list so we get the same responseult regardless of order
    const orderd = [usernameFrom, usernameTo].sort();
    // turn list into string
    const stringified = orderd.join();
    // generate hash
    const hash = md5(stringified);
    return hash;
}

module.exports = function (storageAdapter, request, response) {
    const { body, params } = request;
    // parse needed data from incoming request
    const usernameFrom = body.usernameFrom ? body.usernameFrom.trim().toLowerCase() : null;
    const usernameTo = params.username ? params.username.trim().toLowerCase() : null;
    const message = body.message ? body.message.trim() : null;

    // make sure there is actually a message
    if (!message) {
        response.status(500).send('"message" was not set and is required');
        return;
    }

    // make sure the users involved in the conversation actually exist
    const doesFromUserExist = storageAdapter.doesUserExist(usernameFrom);
    const doesToUserExist = storageAdapter.doesUserExist(usernameTo);

    if (!doesFromUserExist) {
        response.status(500).send(`User "${usernameFrom}" does not exist`);
        return;
    }

    if (!doesToUserExist) {
        response.status(500).send(`User "${usernameTo}" does not exist`);
        return;
    }

    // this the key that uniquely identifies the conversation between these users
    const threadId = getThreadId(usernameFrom, usernameTo);

    // add the new message to the thread
    storageAdapter.writeMessage({
        usernameFrom,
        threadId,
        message
    });

    // get the full thread (with the newly added entry) so we can send it in response
    const thread = storageAdapter.getThreadById(threadId);

    // send the response
    response.send(thread);
};