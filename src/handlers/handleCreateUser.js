module.exports = function (storageAdapter, request, response) {
    const { params } = request;
    // parse the needed param
    const username = params.username ? params.username.trim().toLowerCase() : null;

    // make sure the user doesn't already exist
    const doesUsernameExist = storageAdapter.doesUserExist(username);

    if (doesUsernameExist) {
        response.status(500).send(`User "${username}" already exists`);
        return;
    }

    // create new user
    storageAdapter.createUser(username);

    // send the response
    response.status(201).send();
};